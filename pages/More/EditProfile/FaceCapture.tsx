import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { COLORS } from "../../../constants/Colors";

export default function FaceCapture({ style, setImageData }: any) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<any>(null);

  if (!permission) {
    console.log("permission: ", permission);
    requestPermission();
  }

  if (!permission?.granted) {
    console.log("permission granted: ", permission?.granted);
    requestPermission();
  }

  const toggleCameraType = () => {
    setType((current: any) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takeShot = async () => {
    const opts = { quality: 0.0001, base64: true, skipProcessing: false };

    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync(opts);
      // console.log("photo", photo);
      //   console.log("photo", photo.base64);
      //   console.log("photo keys", Object.keys(photo));
      setImageData({ uri: photo.uri, base64: photo.base64 });
    }
  };
  return (
    <View style={style}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      ></Camera>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takeShot}>
          <Text style={styles.text}>Take Shot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    // borderWidth: 1,
    // borderColor: COLORS.Light.colorSixteen,
  },
  button: {
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10,
  },
  camera: {
    height: "80%",
    // borderWidth: 1,
    // borderColor: COLORS.Light.colorSixteen,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: COLORS.Light.colorFour,
  },
});
