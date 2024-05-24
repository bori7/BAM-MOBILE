// eslint-disable-next-line no-restricted-imports
import EncryptedStorage from 'react-native-encrypted-storage';

type StoreKeyType =
    | 'mobilePrivateKey'
    | 'mobilePublicKey'
    | 'backendPublicKey'
    | 'accessToken'
    | 'refreshToken'
    | 'password'
    | 'username'
    | 'isBiometricActive';

export class EncStorage {
    static async setItem(key: StoreKeyType, value: string) {
        try {
            return await EncryptedStorage.setItem(key, value);
        } catch (e) {
            debug.error('setItem EncryptedStorage', {key, value});
        }
    }

    static async getItem(key: StoreKeyType) {
        try {
            return await EncryptedStorage.getItem(key);
        } catch (e) {
            debug.error('getItem EncryptedStorage', key);
        }
    }

    static async removeItem(key: StoreKeyType) {
        try {
            return await EncryptedStorage.removeItem(key);
        } catch (e) {
            debug.error('removeItem EncryptedStorage', key);
        }
    }

    static async clearToken() {
        const accessToken = await this.getItem('accessToken');
        const refreshToken = await this.getItem('refreshToken');
        if (accessToken && refreshToken) {
            await this.removeItem('accessToken');
            await this.removeItem('refreshToken');
        }
    }

    static async clearBiometrics() {
        const username = await this.getItem('username');
        const password = await this.getItem('password');
        const isBiometricActive = await this.getItem('isBiometricActive');
        if (username && isBiometricActive && password) {
            await this.removeItem('password');
            await this.removeItem('username');
            await this.removeItem('isBiometricActive');
        }
    }

    static async clear() {
        try {
            const accessToken = await this.getItem('accessToken');
            const refreshToken = await this.getItem('refreshToken');
            const mobilePrivateKey = await this.getItem('mobilePrivateKey');
            const mobilePublicKey = await this.getItem('mobilePublicKey');
            const backendPublicKey = await this.getItem('backendPublicKey');
            accessToken && (await this.removeItem('accessToken'));
            refreshToken && (await this.removeItem('refreshToken'));
            mobilePrivateKey && (await this.removeItem('mobilePrivateKey'));
            mobilePublicKey && (await this.removeItem('mobilePublicKey'));
            backendPublicKey && (await this.removeItem('backendPublicKey'));
        } catch (e) {
            debug.error('clear EncryptedStorage');
        }
    }
}
