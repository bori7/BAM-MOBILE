import React from "react";
import { Text, View } from "../../components/Themed";
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, IMAGES, SIZES } from "../../constants/Colors";
// import { ActivityIndicator } from "react-native-paper";

type ICustomLoadingProps = {
  visible: boolean;
  closeModal: () => void;
  onDismissFunc: () => void;
  onShowFunc: () => void;
};

export const CustomLoadingModal = ({
  visible,
  closeModal,
  onDismissFunc = () => {},
  onShowFunc = () => {},
}: ICustomLoadingProps) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={closeModal}
      statusBarTranslucent={true}
      onDismiss={onDismissFunc}
      onShow={onShowFunc}
    >
      <View style={styles.modalContainer}>
        {/* <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback> */}
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.modalImage} onPress={closeModal}>
              <Feather name="x" size={24} color={COLORS.Light.colorOne} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalLogoImage}>
            <ActivityIndicator
              color={COLORS.Light.colorOne}
              size={100}
              animating={true}
              style={styles.loader}
            />

            <Image source={IMAGES.logoDailyAnswer} style={styles.r2t} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    // backgroundColor: COLORS.Light.colorTwentyOne,
    // position: "absolute",
    // borderWidth: 1,
    // zIndex: 2,
  },
  modalContainer: {
    backgroundColor: COLORS.Light.colorTwentyOne,
    flex: 1,
  },
  modalContent: {
    height: "100%",
    marginTop: "auto",
    backgroundColor: COLORS.Light.background,
    // backgroundColor: "transparent",
    borderRadius: 20,
    // borderWidth: 1,
    padding: 20,
    // alignItems: "center",
  },
  modalHeader: {
    // borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: "5%",
  },
  modalHeaderText: {
    textAlign: "center",

    fontSize: SIZES.sizeEight,
    fontWeight: "400",
  },
  modalImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: COLORS.Light.colorSeven,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 35,
  },
  modalLogoImage: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    position: "absolute",
    top: "45%",
    left: "35%",
  },
  r2t: {
    width: 65,
    height: 65,
    position: "absolute",
    top: "26%",
    left: "29%",
  },
  loader: {
    height: 150,
    // borderWidth: 1,
    width: 150,
  },
});
