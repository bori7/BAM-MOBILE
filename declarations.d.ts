declare module "*.svg" {
  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "react-native-password-strength-checker";
declare module "react-native-material-textinput";
declare module "react-native-cached-image";
