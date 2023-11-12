import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { SIZES } from "../../../constants/Colors";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

type IProps = {
  setSelectedImage: (val: string) => void;
  onPressFunc: () => void;
};
const CustomImagePicker = ({
  setSelectedImage = (val: string) => {},
  onPressFunc = () => {},
}: IProps) => {
  // const [selectedImage, setSelectedImage] = useState<string>();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access media library denied");
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];

        const base64Image = await imageToBase64(selectedAsset.uri);
        // console.log(base64Image);
        setSelectedImage(base64Image ?? "");
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  return (
    // <View style={styles.container}>
    //   {selectedImage && (
    //     <Image source={{ uri: selectedImage }} style={styles.image} />
    //   )}
    //  </View>
    <TouchableOpacity
      onPress={async () => {
        await pickImage();
        onPressFunc();
      }}
      style={styles.modalR1C1r}
    >
      <Text style={styles.modalR1C1tb}>{"Choose from gallery"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
  modalR1C1tb: {
    // color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSixB,
    fontWeight: "400",
    marginRight: 10,
  },
  modalR1C1r: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default CustomImagePicker;

export const imageToBase64 = async (uri: string) => {
  try {
    const fileUri = uri;
    // .replace("file://", "");
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (fileInfo.exists) {
      const resizedImage = await manipulateAsync(
        fileUri,
        [{ resize: { width: 300 } }],
        { compress: 0.4, format: SaveFormat.JPEG }
      );

      // console.log(resizedImage);
      const base64 = await FileSystem.readAsStringAsync(resizedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } else {
      console.error("File not found:", fileUri);
      return null;
    }
  } catch (error) {
    console.error("Error converting image to base64", error);
    return null;
  }
};
