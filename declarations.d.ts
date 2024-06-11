declare module 'browser-crypto';

declare module "*.svg" {
    import {SvgProps} from "react-native-svg";

    const content: React.FC<SvgProps>;
    export default content;
}

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "react-native-password-strength-checker";
declare module "react-native-material-textinput";
declare module "react-native-cached-image";
declare module 'react-native-cert-pinner';

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;


declare let debug: {
    log(text: string, data?: unknown): void;
    info(text: string, data?: unknown): void;
    warn(text: string, data?: unknown): void;
    error(text: string, data?: unknown): void;
    success(text: string, data?: unknown): void;
    api_success(text: string, data?: unknown): void;
    api_error(text: string, data?: unknown): void;
};

