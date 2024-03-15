// import crypto, {randomBytes} from 'crypto';
import {Buffer, createCipheriv, createDecipheriv} from 'browser-crypto';
// @ts-ignore
// import {Buffer} from 'buffer';
// import {AES_SECRET_KEY} from "../../constants/props";
// import Crypto from 'react-native-crypto';
import * as Crypto from 'expo-crypto';

export class CipherUtils {

    static ENCRYPTION_ALGORITHM = 'aes-256-gcm';
    static TAG_LENGTH_BIT = 128;
    static IV_LENGTH_BYTE = 12;
    static SALT_LENGTH_BYTE = 16;
    static key = "rbJVr8j";
    // static key = "rbJVr8j".padEnd(32, ' ');

// AES-GCM Encryption
    static async encrypt(text: string) {
        // Convert text to bytes using UTF-8
        const textBytes = Buffer.from(text, 'utf8');

        // Generate random salt and IV
        const salt = await CipherUtils.getSaltRandomByte(CipherUtils.SALT_LENGTH_BYTE);
        const iv = await CipherUtils.getSaltRandomByte(CipherUtils.IV_LENGTH_BYTE);

        // Create AES key from password and salt
        const aesKeyFromPassword = await CipherUtils.getAESKeyFromPassword(CipherUtils.key, salt);

        // Encrypt the text
        // const cipherText = await Crypto.encryptTextAsync(
        //     CipherUtils.ENCRYPTION_ALGORITHM,
        //     textBytes,
        //     aesKeyFromPassword,
        //     { iv, tagLength: CipherUtils.TAG_LENGTH_BIT / 8 }
        // );
        //


        // Combine IV, salt, and cipherText
        // const cipherTextWithIvSalt = Buffer.concat([iv, salt, cipherText]);

        // Create cipher
        // const cipher = createCipheriv(CipherUtils.ENCRYPTION_ALGORITHM, aesKeyFromPassword, iv, {
        //     authTagLength: CipherUtils.TAG_LENGTH_BIT / 8,
        // });
        //
        // // Encrypt the text
        // let encrypted = cipher.update(text, 'utf8', 'base64');
        // encrypted += cipher.final('base64');
        //
        // // Append salt and IV to the ciphertext
        // const cipherTextWithIvSalt = Buffer.concat([iv, salt, Buffer.from(encrypted, 'base64')]);
        //
        // // // Return base64-encoded result
        // // return cipherTextWithIvSalt.toString('base64');
        //
        // // Return base64-encoded result
        // return cipherTextWithIvSalt.toString('base64');


        debug.log("iv", iv)
        debug.log("aesKeyFromPassword", aesKeyFromPassword)
        const cipher = createCipheriv(CipherUtils.ENCRYPTION_ALGORITHM, aesKeyFromPassword, iv,
            {
                authTagLength: CipherUtils.TAG_LENGTH_BIT / 8, // Set the authTagLength to 16 bytes (128 bits)
            }
        );

        debug.log("cipher", cipher);

        // Encrypt the text
        // let encrypted = cipher.update(text, 'utf8', 'base64');
        //
        // encrypted += cipher.final('base64');

        const encrypted = Buffer.concat([
            cipher.update(textBytes),
            cipher.final()
        ]);
        debug.log("encrypted", encrypted)

        const authTag = cipher.getAuthTag();
        debug.log("authTag", authTag)
        //
        // Append salt and IV to the ciphertext
        const cipherTextWithIvSalt = Buffer.concat([iv, salt, encrypted, authTag]);

        debug.log("cipherTextWithIvSalt", cipherTextWithIvSalt)
        // Return base64-encoded result
        return cipherTextWithIvSalt.toString('base64');

        // Encrypt the text
        // let encrypted = cipher.update(textBytes, 'utf8', 'base64');
        // encrypted += cipher.final('base64');
        // debug.log("encrypted", encrypted)

        // Get the authentication tag
        // const authTag = cipher.getAuthTag();
        // debug.log("authTag", authTag)
        // // Combine IV, authTag, and encrypted text
        // const cipherText = Buffer.concat([iv, authTag, Buffer.from(encrypted, 'base64')]);
        // debug.log("cipherText", cipherText)
        //
        // // Return base64-encoded result
        // return cipherText.toString('base64');


    }

// Function to generate random nonce
    static async getSaltRandomByte(numBytes: any) {
        const randomBytes = await CipherUtils.getRandomNonce(numBytes);
        return randomBytes;
    }

// Function to derive AES key from password and salt
    static async getAESKeyFromPassword(password: any, salt: any) {
        debug.log("password", password)
        debug.log("salt", salt)
        //
        // const iterations = 65536; // Number of iterations for PBKDF2
        //
        // // Convert password and salt to UTF-8 bytes
        // const passwordBytes = Buffer.from(password, 'utf8');
        // const saltBytes = Buffer.from(salt, 'base64');
        //
        // // Derive the key using PBKDF2 with expo-crypto
        // const derivedKey = await Crypto.digestStringAsync(
        //     Crypto.CryptoDigestAlgorithm.SHA256,
        //     Buffer.concat([passwordBytes, saltBytes]).toString('base64'),
        //     {iterations: iterations}
        // );
        //
        // // const derivedKey = await Crypto.digestStringAsync(
        // //     Crypto.CryptoDigestAlgorithm.SHA256,
        // //     password + Buffer.from(salt).toString('base64')
        // // );
        // debug.log("derivedKey", derivedKey)
        //
        // return Buffer.from(derivedKey, 'base64');

        // const iterations = 65536; // Number of iterations for PBKDF2
        // const keyLength = 256; // Key length in bits
        //
        // Convert password and salt to UTF-8 bytes
        const passwordBytes = Buffer.from(password, 'utf8');
        debug.log("passwordBytes", passwordBytes)
        // const saltBytes = Buffer.from(salt, 'base64');

        // Derive the key using PBKDF2
        // const key = await CipherUtils.pbkdf2Async(passwordBytes, saltBytes, iterations, keyLength);
        //
        let key = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            Buffer.concat([passwordBytes, salt]).toString('base64')
            // passwordBytes + Buffer.from(salt).toString('base64')
        );

        // let key = await Crypto.digestStringAsync(
        //     Crypto.CryptoDigestAlgorithm.SHA256,
        //     Buffer.concat([passwordBytes, salt]).toString('base64')
        // );

        debug.log("derivedKey1", key.length)

        key = key.substring(0, 32);

        debug.log("derivedKey2", key.length)

        // Convert the key to a Buffer
        return Buffer.from(key);
    }

    static async pbkdf2Async(password: any, salt: any, iterations: number, keyLength: number) {
        let key = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            Buffer.concat([password, salt]).toString('base64')
        );

        // Run additional iterations
        for (let i = 1; i < iterations; i++) {
            const hmac = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                Buffer.concat([Buffer.from(key, 'base64'), salt]).toString('base64')
            );
            key = hmac;
        }

        return key;
    }


    static encryptAesGCM_NoPadding = (text: any): string => {
        const key: string = 'KI9/cuAV3zQ0O5QNGIMwPpAWnMSwueRWLPwHMcTUiQ0=';
        // const key = AES_SECRET_KEY

        const securityUtils = {
            aes: {
                IV_LENGTH_BYTE: 12,
                TAG_LENGTH_BYTE: 16,
                ALGORITHM: 'aes-256-gcm'
            }
        };
        const plainText = JSON.stringify(text);
        // debug.log('ENCRYPTION:::::', `${plainText}, ${key}`);
        const iv = Buffer.alloc(securityUtils.aes.IV_LENGTH_BYTE);
        const cipher = createCipheriv(
            securityUtils.aes.ALGORITHM,
            Buffer.from(key, 'base64'),
            // "rbJVr8j",
            iv
        );
        const encrypted = Buffer.concat([
            cipher.update(String(plainText), 'utf8'),
            cipher.final()
        ]);

        // @ts-ignore
        const tag = cipher.getAuthTag();

        return Buffer.concat([iv, encrypted, tag]).toString('base64');
    };


    static decryptAesGCM_NoPadding = (cipherText: string) => {
        const IV_LENGTH_BYTE = 12;

        const TAG_LENGTH_BYTE = 16;
        const SALT_LENGTH_BYTE = 16;

        const AES_KEY = Buffer.from(
            'KI9/cuAV3zQ0O5QNGIMwPpAWnMSwueRWLPwHMcTUiQ0=',
            'base64'
        );

        // const AES_KEY = "rbJVr8j";


        // const AES_KEY = Buffer.from(
        //     AES_SECRET_KEY,
        //     'base64'
        // );


        const ALGORITHM = 'aes-256-gcm';
        let result: any;

        try {
            const stringValue = Buffer.from(cipherText, 'base64');

            const iv = stringValue.slice(0, IV_LENGTH_BYTE);

            const tag = stringValue.slice(-1 * TAG_LENGTH_BYTE);

            const encrypted = stringValue.slice(
                IV_LENGTH_BYTE,
                stringValue.length - TAG_LENGTH_BYTE
            );

            const decipher = createDecipheriv(ALGORITHM, AES_KEY, iv);

            decipher.setAuthTag(tag);

            const value = decipher.update(encrypted) + decipher.final('utf8');

            result = JSON.parse(value);
        } catch (e) {
            debug.error('Error: {}', e);
        }
        debug.log(`Decrypted Response`, result);
        return result;
    };


    static encrypt2(text: any, key: any) {
        debug.log("inside encrypt", key)
        const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
        const SALT_LENGTH_BYTE = 16; // 16 bytes
        const IV_LENGTH_BYTE = 12; // 12 bytes
        const TAG_LENGTH_BIT = 128; // 128 bits

        // Convert key to Buffer
        const keyBuffer = Buffer.from(key, 'utf8');

        // Generate random salt and IV
        const salt = CipherUtils.getRandomNonce(SALT_LENGTH_BYTE);
        const iv = CipherUtils.getRandomNonce(IV_LENGTH_BYTE);

        // Create AES key from password and salt
        const aesKeyFromPassword = CipherUtils.getAESKeyFromPassword2(keyBuffer, salt);


        // Create cipher
        const cipher = createCipheriv(ENCRYPTION_ALGORITHM, aesKeyFromPassword, iv, {
            authTagLength: TAG_LENGTH_BIT / 8,
        });

        // Encrypt the text
        let encrypted = cipher.update(text, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        // Append salt and IV to the ciphertext
        const cipherTextWithIvSalt = Buffer.concat([iv, salt, Buffer.from(encrypted, 'base64')]);

        // Return base64-encoded result
        return cipherTextWithIvSalt.toString('base64');
    }


// Function to generate random nonce
//     static getRandomNonce(numBytes: number | Iterable<number>) {
//         // @ts-ignore
//         const nonce = new Uint8Array(numBytes);
//         crypto.getRandomValues(nonce);
//         return Buffer.from(nonce);
//     }

// Function to derive AES key from password and salt
//     static getAESKeyFromPassword(password: any, salt: any) {
//         const ENCRYPTION_KEY_SIZE = 256; // 256 bits
//         const iterations = 65536;
//
//         // Derive key using PBKDF2
//         const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, ENCRYPTION_KEY_SIZE / 8, 'sha256');
//
//         return derivedKey;
//     }


    static getRandomNonce(numBytes: number | Iterable<number>) {
        debug.log("getRandomNonce", numBytes)
        // @ts-ignore
        const nonce = new Uint8Array(numBytes);
        for (let i = 0; i < numBytes; i++) {
            nonce[i] = CipherUtils.getRandomByte();
        }

        return Buffer.from(nonce, 'base64');


    }


// Function to generate a random byte
    static getRandomByte() {
        return Math.floor(Math.random() * 256);
    }

// Function to derive AES key from password and salt
//     static getAESKeyFromPassword(password: any, salt: any) {
//         const ENCRYPTION_KEY_SIZE = 256; // 256 bits
//         const iterations = 65536;
//
//         // Derive key using PBKDF2
//         const derivedKey = CipherUtils.pbkdf2(password, salt, iterations, ENCRYPTION_KEY_SIZE / 8);
//
//         return derivedKey;
//     }

    // static async getAESKeyFromPassword(password, salt) {
    //     const ENCRYPTION_KEY_SIZE = 256; // 256 bits
    //     const iterations = 65536;
    //
    //     // Derive key using PBKDF2
    //     const derivedKey = await Crypto.pbkdf2Async(
    //         password,
    //         salt,
    //         iterations,
    //         ENCRYPTION_KEY_SIZE / 8,
    //         Crypto.CryptoDigestAlgorithm.SHA256
    //     );
    //
    //     return derivedKey;
    // }

    // Function to derive AES key from password and salt
    static async getAESKeyFromPassword2(password: any, salt: any) {
        debug.log("getAESKeyFromPassword1", password)
        debug.log("getAESKeyFromPassword2", salt)
        const ENCRYPTION_KEY_SIZE = 256; // 256 bits
        const iterations = 65536;

        // Derive key using custom PBKDF2 implementation
        const derivedKey = await CipherUtils.pbkdf2(password, salt, iterations, ENCRYPTION_KEY_SIZE / 8);
        debug.log("getAESKeyFromPassword3", derivedKey)
        return derivedKey;
    }

// PBKDF2 Key Derivation Function
    static async pbkdf2(password: any, salt: any, iterations: number, keyLength: number) {
        debug.log("pbkdf21", password)
        debug.log("pbkdf22", salt)
        debug.log("pbkdf23", iterations)
        debug.log("pbkdf24", keyLength)
        const key = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            password + salt
        );
        debug.log("pbkdf25", key)
        let derivedKey = key;
        for (let i = 1; i < iterations; i++) {
            const hash = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                derivedKey
            );
            derivedKey = hash;
        }

        debug.log("pbkdf26", derivedKey)

        derivedKey = derivedKey.substring(0, keyLength * 2); // Convert to hex and trim to key length
        debug.log("pbkdf27", derivedKey)
        return derivedKey
    }

// PBKDF2 Key Derivation Function (JS implementation)
//     static pbkdf2(password: string, salt: any, iterations: any, keyLength: number) {
//         let key = '';
//         while (key.length < keyLength) {
//             const hash = CipherUtils.hashHmac(password + key, salt, 'sha256');
//             for (let i = 0; i < hash.length && key.length < keyLength; i++) {
//                 key += hash[i];
//             }
//         }
//         return key;
//     }

// HMAC Hash Function (JS implementation)
//     static hashHmac(key: any, data: any, algorithm: any) {
//         const hmac:any = CipherUtils.createHmac(algorithm, key);
//         hmac.update(data);
//         return hmac.digest();
//     }

    // static hashHmac(key: Buffer, data: Buffer, algorithm: string): Buffer {
    //     const hmac = CipherUtils.createHmac(algorithm, key);
    //     hmac.update(data);
    //     return hmac.digest();
    // }
// Create Hmac Hash
//     static createHmac(algorithm: any, key: any) {
//         return CipherUtils.createHash(algorithm).update(key);
//     }
//     static createHmac(algorithm: any, key: any) {
//         return Crypto.createHmac(algorithm, key);
//     }

// Function to hash using HMAC
//     static hashHmac(key: string, data: any, algorithm: string) {
//         const hmac = CipherUtils.createHmac(algorithm, key);
//         hmac.update(data);
//         return hmac.digest();
//     }

// Create Hash
//     static createHash(algorithm: any) {
//         switch (algorithm) {
//             case 'sha256':
//                 return {
//                     update: function (data: any) {
//                         return CipherUtils.hash(data, 8);
//                     },
//                     digest: function () {
//                         return CipherUtils.hash('', 8);
//                     },
//                 };
//             default:
//                 throw new Error('Unknown algorithm');
//         }
//     }

// Hash Function
//     static hash(data: any, length: number) {
//         let result = '';
//         for (let i = 0; i < length; i++) {
//             result += String.fromCharCode(CipherUtils.getRandomByte());
//         }
//         return result;
//     }

    // static randomString() {
    //     return CryptoJS.lib.WordArray.random(16).toString();
    // }
    //
    // static encodeBase64(data: string) {
    //     return util.encode64(data);
    // }
    //
    // static encryptByDES<T extends string>(message: T, key: T): string {
    //     const keyHex = CryptoJS.enc.Utf8.parse(key);
    //
    //     // CryptoJS use CBC as the default mode, and Pkcs7 as the default padding scheme
    //     const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    //         mode: CryptoJS.mode.ECB,
    //         padding: CryptoJS.pad.Pkcs7,
    //     });
    //     return encrypted.toString();
    // }
    //
    // static decryptByDES(ciphertext: string, key: string) {
    //     const keyHex = CryptoJS.enc.Utf8.parse(key);
    //
    //     // direct decrypt ciphertext
    //     const decrypted = CryptoJS.DES.decrypt(
    //         // @ts-expect-error: for work
    //         {
    //             ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
    //         },
    //         keyHex,
    //         {
    //             mode: CryptoJS.mode.ECB,
    //             padding: CryptoJS.pad.Pkcs7,
    //         },
    //     );
    //
    //     return decrypted.toString(CryptoJS.enc.Utf8);
    // }
    //
    // private static encryptionOptions(type?: string, key: string = '') {
    //     if (type === 'rsa') {
    //         return {
    //             md: md.sha1.create(),
    //             mgf: mgf.mgf1.create(md.sha1.create()),
    //         };
    //     }
    //     //AES
    //     if (type === 'SMS') {
    //         return {
    //             iv: CryptoJS.enc.Utf8.parse(key),
    //             mode: CryptoJS.mode.ECB,
    //             padding: CryptoJS.pad.Pkcs7,
    //         };
    //     }
    //     return {
    //         iv: CryptoJS.enc.Utf8.parse(key),
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.Pkcs7,
    //     };
    // }

    // static generateRsaKeys(): Promise<{
    //   mobilePublicKey: string;
    //   mobilePrivateKey: string;
    // }> {
    //   return RSA.generateKeys(2048) // set key size
    //     .then(keys => {
    //       return {
    //         mobilePublicKey: keys.public,
    //         mobilePrivateKey: keys.private,
    //       };
    //     });
    // }

    // static encryptRsa(plainText: string, key: string) {
    //     try {
    //         const publicKey = pki.publicKeyFromPem(key);
    //         const result = util.encode64(
    //             publicKey.encrypt(plainText, 'RSA-OAEP', this.encryptionOptions('rsa')),
    //         );
    //         return result.toString();
    //     } catch (error) {
    //         debug.info('error encryps RSA ', error);
    //     }
    // }
    //
    // static decryptRsa(cipherText: string, key: string) {
    //     try {
    //         const privateKey = pki.privateKeyFromPem(key);
    //
    //         const textDecodeBase64 = util.decode64(cipherText);
    //         return privateKey.decrypt(
    //             textDecodeBase64,
    //             'RSA-OAEP',
    //             this.encryptionOptions('rsa'),
    //         );
    //     } catch (error) {
    //         debug.info('error decrypt RSA :', error);
    //     }
    // }

    // static encryptAes(data: unknown, key: string) {
    //     try {
    //         // const keyBase64 = util.encode64(key);
    //         // const keyPars = CryptoJS.enc.Base64.parse(keyBase64);
    //         const formattedData =
    //             typeof data === 'object' ? JSON.stringify(data) : String(data); // we need to do JSON.stringify only for object
    //
    //         const keyPars = CryptoJS.enc.Base64.parse(key);
    //         const encrypted = CryptoJS.AES.encrypt(
    //             formattedData,
    //             keyPars,
    //             this.encryptionOptions(),
    //         );
    //         return encrypted.toString();
    //     } catch (error) {
    //         debug.info('error encrypt AES :', error);
    //     }
    // }
    //
    // static decryptAes(cipher: string, key: string) {
    //     // response + key from redux
    //     try {
    //         // const keyBase64 = util.encode64(key);
    //         // const keyPars = CryptoJS.enc.Base64.parse(keyBase64);
    //
    //         const keyPars = CryptoJS.enc.Base64.parse(key);
    //         const result = CryptoJS.AES.decrypt(cipher, keyPars, this.encryptionOptions());
    //
    //         // Debug.log('info', 'result decode AES :', result.toString(CryptoJS.enc.Utf8));
    //         return result.toString(CryptoJS.enc.Utf8);
    //     } catch (error) {
    //         debug.info('error decrypt AES', error);
    //         return '';
    //     }
    // }
    //
    // static encryptAesPanCard(data: string, key: string, type: string = '') {
    //     try {
    //         const keyPars = CryptoJS.enc.Utf8.parse(key);
    //
    //         const encrypted = CryptoJS.AES.encrypt(
    //             data,
    //             keyPars,
    //             this.encryptionOptions(type, key),
    //         );
    //         return encrypted.toString();
    //     } catch (error) {
    //         debug.info('error encrypt AES', error);
    //     }
    // }
    //
    // static decryptAesPanCard(cipher: string, key: string, type: string = '') {
    //     // response + key from redux
    //     try {
    //         const keyPars = CryptoJS.enc.Utf8.parse(key);
    //         const result = CryptoJS.AES.decrypt(
    //             cipher,
    //             keyPars,
    //             this.encryptionOptions(type, key),
    //         );
    //
    //         // Debug.log( 'info','result decode AES :', 'decode', result.toString(CryptoJS.enc.Utf8));
    //         return result.toString(CryptoJS.enc.Utf8);
    //     } catch (error) {
    //         debug.info('error decrypt AES', error);
    //     }
    // }
    //
    // static encryptionMessage(
    //     data: unknown,
    //     publicKey: string,
    // ): { message: string; key: string } {
    //     // rsa key from env
    //     try {
    //         const aesKey = random.getBytesSync(16); //  aes key 128 bits (16 bytes) long
    //         const keyPars = util.encode64(aesKey);
    //         const aesKeyEncrypted = this.encryptRsa(aesKey, publicKey);
    //         if (!aesKeyEncrypted) {
    //             debug.error('error rsa - aes');
    //             return {message: '', key: ''};
    //         }
    //
    //         const messageEncryptedString = this.encryptAes(data, keyPars);
    //         const aesKeyLenHex = aesKeyEncrypted.length.toString(16);
    //
    //         // Debug.log(
    //         //   'info',
    //         //   'message encrypt :',
    //         //   aesKeyLenHex + aesKeyEncrypted + messageEncryptedString,
    //         // );
    //         return {
    //             message: aesKeyLenHex + aesKeyEncrypted + messageEncryptedString,
    //             key: keyPars,
    //         };
    //     } catch (error) {
    //         debug.error('error aes encrypt', error);
    //         return {message: '', key: ''};
    //     }
    // }

    // static decryptionMessage(encryptedMessage: string, privateKey: string) {
    //     try {
    //         const symLengthHex = encryptedMessage.substring(0, 3);
    //         const symBase64Length = parseInt(symLengthHex, 16);
    //         const aesKeyRsa = encryptedMessage.substring(3, symBase64Length + 3);
    //         const messageEncrypted = encryptedMessage.substring(
    //             symBase64Length + 3,
    //             encryptedMessage.length,
    //         );
    //         const aesKey = this.decryptRsa(aesKeyRsa, privateKey);
    //         // @ts-expect-error: for work
    //         const message = this.decryptAes(messageEncrypted, util.encode64(aesKey));
    //
    //         debug.info('decryption message ', message);
    //         return message;
    //     } catch (error) {
    //         debug.info('error aes decrypt ', error);
    //     }
    // }

    // static return64Key(key: string): string {
    //     const formatKey = key
    //         .replace('-----BEGIN PUBLIC KEY-----', '')
    //         .replace('-----END PUBLIC KEY-----', '')
    //         .replace('-----BEGIN RSA PUBLIC KEY-----', '')
    //         .replace('-----END RSA PUBLIC KEY-----', '');
    //     return util.encode64(formatKey);
    // }
    //
    // static toPem<T extends string>(privateKey: T): string {
    //     let b64 = util.decode64(privateKey);
    //     let finalString = '';
    //     while (b64.length > 0) {
    //         finalString += b64.substring(0, 64) + '\n';
    //         b64 = b64.substring(64);
    //     }
    //     return '-----BEGIN PUBLIC KEY-----\n' + finalString + '-----END PUBLIC KEY-----';
    // }

    /*============================ 3DS ============================ */
    //
    // static #TAG_LENGTH_BIT = 128;
    // static #IV_LENGTH_BYTE = 12;
    // static #SALT_LENGTH_BYTE = 16;
    // static #ITERATION_COUNT = 65536;
    // static #KEY_SIZE = 32;
    // static #PASSWORD = '5D2DF6E11DRTFYGUHIJOKJIH1234567JBHVGCF';

    // static encrypt3ds(message: unknown) {
    //     const iv = random.getBytesSync(this.#IV_LENGTH_BYTE);
    //     const salt = random.getBytesSync(this.#SALT_LENGTH_BYTE);
    //
    //     const key = pkcs5.pbkdf2(
    //         this.#PASSWORD,
    //         salt,
    //         this.#ITERATION_COUNT,
    //         this.#KEY_SIZE,
    //         md.sha256.create(),
    //     );
    //
    //     const cipher = forgeCipher.createCipher('AES-GCM', key);
    //
    //     cipher.start({
    //         iv,
    //         tagLength: this.#TAG_LENGTH_BIT,
    //     });
    //
    //     cipher.update(util.createBuffer(JSON.stringify(message)));
    //
    //     cipher.finish();
    //
    //     const encrypted = cipher.output;
    //     const tag = cipher.mode.tag;
    //
    //     return util.encode64(iv + salt + encrypted.data + tag.data);
    // }
    //
    // static decrypt3ds(message: string) {
    //     const decoded = util.decode64(message);
    //     const salt = decoded.slice(
    //         this.#IV_LENGTH_BYTE,
    //         this.#IV_LENGTH_BYTE + this.#SALT_LENGTH_BYTE,
    //     );
    //     const iv = decoded.slice(0, this.#IV_LENGTH_BYTE);
    //     const tag = decoded.slice(-this.#TAG_LENGTH_BIT / 8);
    //
    //     const encryptedPart = decoded.slice(
    //         this.#IV_LENGTH_BYTE + this.#SALT_LENGTH_BYTE,
    //         -this.#TAG_LENGTH_BIT / 8,
    //     );
    //
    //     const key = pkcs5.pbkdf2(
    //         this.#PASSWORD,
    //         salt,
    //         this.#ITERATION_COUNT,
    //         this.#KEY_SIZE,
    //         md.sha256.create(),
    //     );
    //
    //     const decipher = forgeCipher.createDecipher('AES-GCM', key);
    //
    //     decipher.start({
    //         iv,
    //         tagLength: this.#TAG_LENGTH_BIT,
    //         // @ts-expect-error: for work
    //         tag,
    //     });
    //
    //     decipher.update(util.createBuffer(encryptedPart));
    //     const pass = decipher.finish();
    //
    //     // pass is false if there was a failure (eg: authentication tag didn't match)
    //     if (pass) {
    //         const result = decipher.output.toString();
    //
    //         return JSON.parse(result);
    //     }
    // }
    //
    // static createSecureHash(dataForRequest: object): string {
    //     const sha512 = md.sha512.create();
    //
    //     const labKey = 'zZ0YToOdzQ';
    //     const resultString = Object.values(dataForRequest).join('');
    //
    //     const resultMessage = resultString + labKey;
    //     sha512.update(resultMessage, 'utf8');
    //
    //     return util.bytesToHex(sha512.digest().getBytes());
    // }
    //
    // static createSecureHashMakeMoneyString(dataForRequest: string) {
    //     const sha512 = md.sha512.create();
    //
    //     const resultString = Object.values(dataForRequest).join('');
    //
    //     const resultMessage = resultString;
    //     sha512.update(resultMessage, 'utf8');
    //
    //     // console.log("makemoneyhash::", util.bytesToHex(sha512.digest().getBytes()));
    //     return util.bytesToHex(sha512.digest().getBytes());
    // }

}
