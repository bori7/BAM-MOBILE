import {RSA} from 'react-native-rsa-native';
import CryptoJS from 'crypto-js';
import {cipher as forgeCipher, md, mgf, pkcs5, pki, random, util} from 'node-forge';

export class CipherUtils {
    static randomString() {
        return CryptoJS.lib.WordArray.random(16).toString();
    }

    static encodeBase64(data: string) {
        return util.encode64(data);
    }

    static encryptByDES<T extends string>(message: T, key: T): string {
        const keyHex = CryptoJS.enc.Utf8.parse(key);

        // CryptoJS use CBC as the default mode, and Pkcs7 as the default padding scheme
        const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        });
        return encrypted.toString();
    }

    static decryptByDES(ciphertext: string, key: string) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);

        // direct decrypt ciphertext
        const decrypted = CryptoJS.DES.decrypt(
            // @ts-expect-error: for work
            {
                ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
            },
            keyHex,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            },
        );

        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    private static encryptionOptions(type?: string, key: string = '') {
        if (type === 'rsa') {
            return {
                md: md.sha1.create(),
                mgf: mgf.mgf1.create(md.sha1.create()),
            };
        }
        //AES
        if (type === 'SMS') {
            return {
                iv: CryptoJS.enc.Utf8.parse(key),
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            };
        }
        return {
            iv: CryptoJS.enc.Utf8.parse(key),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        };
    }

    static generateRsaKeys(): Promise<{
        mobilePublicKey: string;
        mobilePrivateKey: string;
    }> {
        return RSA.generateKeys(2048) // set key size
            .then(keys => {
                return {
                    mobilePublicKey: keys.public,
                    mobilePrivateKey: keys.private,
                };
            });
    }

    static encryptRsa(plainText: string, key: string) {
        try {
            const publicKey = pki.publicKeyFromPem(key);

            const result = util.encode64(
                publicKey.encrypt(plainText, 'RSA-OAEP', this.encryptionOptions('rsa')),
            );
            return result.toString();
        } catch (error) {
            debug.info('error encryps RSA ', error);
        }
    }

    static decryptRsa(cipherText: string, key: string) {
        try {
            const privateKey = pki.privateKeyFromPem(key);

            const textDecodeBase64 = util.decode64(cipherText);
            return privateKey.decrypt(
                textDecodeBase64,
                'RSA-OAEP',
                this.encryptionOptions('rsa'),
            );
        } catch (error) {
            debug.info('error decrypt RSA :', error);
        }
    }

    static encryptAes(data: unknown, key: string) {
        try {
            // const keyBase64 = util.encode64(key);
            // const keyPars = CryptoJS.enc.Base64.parse(keyBase64);
            const formattedData =
                typeof data === 'object' ? JSON.stringify(data) : String(data); // we need to do JSON.stringify only for object

            const keyPars = CryptoJS.enc.Base64.parse(key);
            const encrypted = CryptoJS.AES.encrypt(
                formattedData,
                keyPars,
                this.encryptionOptions(),
            );
            return encrypted.toString();
        } catch (error) {
            debug.info('error encrypt AES :', error);
        }
    }

    static decryptAes(cipher: string, key: string) {
        // response + key from redux
        try {
            // const keyBase64 = util.encode64(key);
            // const keyPars = CryptoJS.enc.Base64.parse(keyBase64);

            const keyPars = CryptoJS.enc.Base64.parse(key);
            const result = CryptoJS.AES.decrypt(cipher, keyPars, this.encryptionOptions());

            // Debug.log('info', 'result decode AES :', result.toString(CryptoJS.enc.Utf8));
            return result.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            debug.info('error decrypt AES', error);
            return '';
        }
    }

    static encryptAesPanCard(data: string, key: string, type: string = '') {
        try {
            const keyPars = CryptoJS.enc.Utf8.parse(key);

            const encrypted = CryptoJS.AES.encrypt(
                data,
                keyPars,
                this.encryptionOptions(type, key),
            );
            return encrypted.toString();
        } catch (error) {
            debug.info('error encrypt AES', error);
        }
    }

    static decryptAesPanCard(cipher: string, key: string, type: string = '') {
        // response + key from redux
        try {
            const keyPars = CryptoJS.enc.Utf8.parse(key);
            const result = CryptoJS.AES.decrypt(
                cipher,
                keyPars,
                this.encryptionOptions(type, key),
            );

            // Debug.log( 'info','result decode AES :', 'decode', result.toString(CryptoJS.enc.Utf8));
            return result.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            debug.info('error decrypt AES', error);
        }
    }

    static encryptionMessage(
        data: unknown,
        publicKey: string,
    ): { message: string; key: string } {
        // rsa key from env
        try {
            const aesKey = random.getBytesSync(16); //  aes key 128 bits (16 bytes) long
            const keyPars = util.encode64(aesKey);
            const aesKeyEncrypted = this.encryptRsa(aesKey, publicKey);
            if (!aesKeyEncrypted) {
                debug.error('error rsa - aes');
                return {message: '', key: ''};
            }

            const messageEncryptedString = this.encryptAes(data, keyPars);
            const aesKeyLenHex = aesKeyEncrypted.length.toString(16);

            // Debug.log(
            //   'info',
            //   'message encrypt :',
            //   aesKeyLenHex + aesKeyEncrypted + messageEncryptedString,
            // );
            return {
                message: aesKeyLenHex + aesKeyEncrypted + messageEncryptedString,
                key: keyPars,
            };
        } catch (error) {
            debug.error('error aes encrypt', error);
            return {message: '', key: ''};
        }
    }

    static decryptionMessage(encryptedMessage: string, privateKey: string) {
        try {
            const symLengthHex = encryptedMessage?.substring(0, 3);
            const symBase64Length = parseInt(symLengthHex, 16);
            const aesKeyRsa = encryptedMessage?.substring(3, symBase64Length + 3);
            const messageEncrypted = encryptedMessage?.substring(
                symBase64Length + 3,
                encryptedMessage.length,
            );
            const aesKey = this.decryptRsa(aesKeyRsa, privateKey);
            // @ts-expect-error: for work
            const message = this.decryptAes(messageEncrypted, util.encode64(aesKey));

            debug.info('decryption message ', message);
            return message;
        } catch (error) {
            debug.info('error aes decrypt ', error);
        }
    }

    static return64Key(key: string): string {
        const formatKey = key
            .replace('-----BEGIN PUBLIC KEY-----', '')
            .replace('-----END PUBLIC KEY-----', '')
            .replace('-----BEGIN RSA PUBLIC KEY-----', '')
            .replace('-----END RSA PUBLIC KEY-----', '');
        return util.encode64(formatKey);
    }

    static toPem<T extends string>(privateKey: T): string {
        let b64 = util.decode64(privateKey);
        let finalString = '';
        while (b64.length > 0) {
            finalString += b64.substring(0, 64) + '\n';
            b64 = b64.substring(64);
        }
        return '-----BEGIN PUBLIC KEY-----\n' + finalString + '-----END PUBLIC KEY-----';
    }

    /*============================ 3DS ============================ */

    static #TAG_LENGTH_BIT = 128;
    static #IV_LENGTH_BYTE = 12;
    static #SALT_LENGTH_BYTE = 16;
    static #ITERATION_COUNT = 65536;
    static #KEY_SIZE = 32;
    static #PASSWORD = '5D2DF6E11BA475702E9C9A1D1828832C234';

    static encrypt3ds(message: unknown) {
        const iv = random.getBytesSync(this.#IV_LENGTH_BYTE);
        const salt = random.getBytesSync(this.#SALT_LENGTH_BYTE);

        const key = pkcs5.pbkdf2(
            this.#PASSWORD,
            salt,
            this.#ITERATION_COUNT,
            this.#KEY_SIZE,
            md.sha256.create(),
        );

        const cipher = forgeCipher.createCipher('AES-GCM', key);

        cipher.start({
            iv,
            tagLength: this.#TAG_LENGTH_BIT,
        });

        cipher.update(util.createBuffer(JSON.stringify(message)));

        cipher.finish();

        const encrypted = cipher.output;
        const tag = cipher.mode.tag;

        return util.encode64(iv + salt + encrypted.data + tag.data);
    }

    static decrypt3ds(message: string) {
        const decoded = util.decode64(message);
        const salt = decoded.slice(
            this.#IV_LENGTH_BYTE,
            this.#IV_LENGTH_BYTE + this.#SALT_LENGTH_BYTE,
        );
        const iv = decoded.slice(0, this.#IV_LENGTH_BYTE);
        const tag = decoded.slice(-this.#TAG_LENGTH_BIT / 8);

        const encryptedPart = decoded.slice(
            this.#IV_LENGTH_BYTE + this.#SALT_LENGTH_BYTE,
            -this.#TAG_LENGTH_BIT / 8,
        );

        const key = pkcs5.pbkdf2(
            this.#PASSWORD,
            salt,
            this.#ITERATION_COUNT,
            this.#KEY_SIZE,
            md.sha256.create(),
        );

        const decipher = forgeCipher.createDecipher('AES-GCM', key);

        decipher.start({
            iv,
            tagLength: this.#TAG_LENGTH_BIT,
            // @ts-expect-error: for work
            tag,
        });

        decipher.update(util.createBuffer(encryptedPart));
        const pass = decipher.finish();

        // pass is false if there was a failure (eg: authentication tag didn't match)
        if (pass) {
            const result = decipher.output.toString();

            return JSON.parse(result);
        }
    }

    static createSecureHash(dataForRequest: object): string {
        const sha512 = md.sha512.create();

        const labKey: string = 'zZ0YToOdzQLYbuJNGyci';
        const resultString: string = Object.values(dataForRequest).join('');

        const resultMessage: string = resultString + labKey;
        sha512.update(resultMessage, 'utf8');

        return util.bytesToHex(sha512.digest().getBytes());
    }

    static createSecureHashMakeMoneyString(dataForRequest: string) {
        const sha512 = md.sha512.create();

        const resultString = Object.values(dataForRequest).join('');

        const resultMessage = resultString;
        sha512.update(resultMessage, 'utf8');

        // console.log("makemoneyhash::", util.bytesToHex(sha512.digest().getBytes()));
        return util.bytesToHex(sha512.digest().getBytes());
    }
}
