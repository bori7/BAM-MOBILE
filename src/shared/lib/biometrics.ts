import ReactNativeBiometrics from 'react-native-biometrics';


import {EncStorage} from "@shared/lib/encStorage";
import {store} from "@store/index";


enum BiometryType {
    FaceID = 'FaceID',
    TouchID = 'TouchID',
    Biometrics = 'Biometrics',
}

const biometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const getBiometryType = async (): Promise<BiometryType | undefined> => {
    const {available, biometryType} = await biometrics.isSensorAvailable();

    if (available && biometryType) {
        return biometryType as BiometryType;
    }
    return undefined;
};

const authenticateBiometric = async () => {
    try {
        const resultObject = await biometrics.simplePrompt({
            promptMessage: 'Confirm biometric',
        });

        if (resultObject.success) {
            debug.log('successful biometrics provided');
            return true;
        } else {
            debug.log('user cancelled biometric prompt');
            return false;
        }
    } catch (e) {
        debug.error('authenticateBiometric', e);
        return false;
    }
};

const checkIsBiometricActive = async (username?: string) => {
    try {
        // const currentUserID = store.getState().user.userData?.id;
        const userID = await EncStorage.getItem('isBiometricActive');
        debug.log('currentUserID', userID)
        // return (userId || currentUserID) === userID;
        return userID;
    } catch (err) {
        debug.error('checkIsBiometricActive', err);
        throw err;
    }
};

const setIsBiometricActive = async (userId: string) => {
    await EncStorage.setItem('isBiometricActive', String(userId));
};

const setUsername = async (value: string) => {
    await EncStorage.setItem('username', value);
};

const setPassword = async (value: string) => {
    await EncStorage.setItem('password', value);
};

const setDataBiometricUser = async (username = '', password = '') => {
    debug.log("setting biometric user data")
    await setIsBiometricActive(username);
    await setUsername(username)
    await setPassword(password);
};

const clearBiometricUser = async (username = '', password = '') => {
    debug.log("unsetting biometric user data")
    await EncStorage.clearBiometrics();
};

const getPassword = async (username = '') => {
    try {
        const isBiometricActive = await checkIsBiometricActive(username);
        if (!isBiometricActive) {
            throw 'error while checking isBiometricActive';
        }
        const result = await authenticateBiometric();
        if (result) {

            return (
                {
                    password: await EncStorage.getItem('password'),
                    username: await EncStorage.getItem('username')
                }
            );
        }

        return null;
    } catch (err) {
        debug.error('getPasswordError', err);
        return null;
    }
};

export default {
    getPassword,
    setPassword,
    setUsername,
    getBiometryType,
    setIsBiometricActive,
    setDataBiometricUser,
    authenticateBiometric,
    checkIsBiometricActive,
    clearBiometricUser
};

//const GENERIC_PASSWORD_USERNAME = 'biometricsPublicKey';
// const STARGAZER_SIGN_MESSAGE = ' Stargazer signature message';
// const ALGORITHM = 'SHA256withRSA';
//
// const BEGIN_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----';
// const END_PUBLIC_KEY = '-----END PUBLIC KEY-----';
//const getBiometryType = async (): Promise<BiometryType | undefined> => {
//   const { available, biometryType } = await biometrics.isSensorAvailable();
//
//   if (available && biometryType) {
//     return biometryType as BiometryType;
//   }
//   return undefined;
// };
//
// const keyExists = async () => {
//   const { keysExist } = await biometrics.biometricKeysExist();
//   if (keysExist) {
//     debug.log('Keys exist');
//   } else {
//     debug.log('Keys do not exist or were deleted');
//   }
//   return keysExist;
// };
//
// const createKeys = async () => {
//   // Create a public private key pair
//   const { publicKey } = await biometrics.createKeys();
//   // Store public key in storage
//   await EncStorage.setItem(GENERIC_PASSWORD_USERNAME, publicKey);
// };
//
// const deleteKeys = async () => {
//   // Delete keys
//   const { keysDeleted } = await biometrics.deleteKeys();
//   // Return if keys were deleted successfully
//   return keysDeleted;
// };
//const createSignature = async (title: string, message: string) => {
//   // Generate secret message
//   const epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
//   const secret = epochTimeSeconds + message;
//   // Return signature created
//   const signatureResult = await biometrics.createSignature({
//     promptMessage: title,
//     payload: secret,
//   });
//   if (signatureResult.error) {
//     return;
//   }
//   return { ...signatureResult, secret };
// };
//
// const verifySignature = async (signature: string, secret: string) => {
//   const key = await EncStorage.getItem(GENERIC_PASSWORD_USERNAME);
//   // Generate public key
//   const publicKey = `${BEGIN_PUBLIC_KEY}\n${key}\n${END_PUBLIC_KEY}`;
//   // Verify signature
//   return RSA.verifyWithAlgorithm(signature, secret, publicKey, ALGORITHM);
// };
