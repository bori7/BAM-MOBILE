import React, { ReactNode, useEffect, useState, useRef } from "react";
import { Text, View } from "../../../components/Themed";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { CompositeScreenProps } from "@react-navigation/native";
import { MoreProps, MoreRoutes } from "../../../shared/const/routerMore";
import { RootScreenProps, RootRoutes } from "../../../shared/const/routerRoot";
import { COLORS } from "../../../constants/Colors";
import { imageToBase64 } from "./CustomImagePicker";
import CameraButton from "./CameraButton";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { userActions } from "../../../store/slices/user";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";

type NavigationProps = CompositeScreenProps<
  MoreProps<MoreRoutes.ImageCapture>,
  RootScreenProps<RootRoutes.More>
>;

const ImageCapture: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);

  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFlipPress = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const handleCapturePress = async () => {
    // const opts = { quality: 0.0001, base64: true, skipProcessing: false };
    if (cameraRef.current) {
      let photo = await cameraRef.current?.takePictureAsync();

      // console.log(photo);
      const base64Image = await imageToBase64(photo.uri);
      dispatch(userActions.updateImageBase64(base64Image || ""));
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      style={styles.camera}
      type={type}
      ref={(ref) => (cameraRef.current = ref)}
    >
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity> */}

        <Feather
          name="x"
          size={30}
          color={COLORS.Light.background}
          onPress={() => {
            navigation?.goBack();
          }}
        />

        <MaterialIcons
          name="flip-camera-android"
          size={24}
          color={COLORS.Light.background}
          onPress={handleFlipPress}
        />
      </View>

      <CameraButton
        onPressFunc={async () => {
          await handleCapturePress().then((_) => {
            navigation?.goBack();
          });
        }}
        xstyle={styles.captureButton}
        height={30}
        width={30}
        strokeColor={COLORS.Light.background}
      />
    </Camera>
  );
};
export default ImageCapture;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
    // backgroundColor: COLORS.Light.background,
    backgroundColor: "transparent",
    position: "absolute",
    top: "5%",
    width: "100%",
  },
  button: {
    // alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: COLORS.Light.background,
    borderRadius: 5,
    padding: 10,
    // position: "absolute",
    // top: "50%",
  },
  buttonText: {
    fontSize: 18,
    // color: COLORS.Light.background,
    color: COLORS.Light.colorFour,
  },
  captureButton: {
    // alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: "8%",
    left: "44%",
    backgroundColor: COLORS.Light.colorBlue,
    borderRadius: 50,
    padding: 15,
    borderWidth: 2,
    borderColor: COLORS.Light.hashHomeBackGroundL3,
  },
  captureButtonText: {
    fontSize: 16,
    color: COLORS.Light.colorFour,
  },
});
