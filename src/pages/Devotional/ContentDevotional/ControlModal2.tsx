import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import React, { ReactElement } from "react";
import { Text, View } from "@components/Themed";
import { COLORS, IMAGES, SIZES } from "@constants/Colors";
import Modal from "react-native-modal";
import Layout from "../../../constants/Layout";

type IProps = {
  visible: boolean;
  closeModal: () => void;
  children?: ReactElement;
};
const ControlModal2 = ({ visible, closeModal, children }: IProps) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection={["down"]}
      backdropColor={COLORS.Light.colorOverlay}
      style={styles.modalContainer}
      statusBarTranslucent={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={150}
      animationOutTiming={150}
      deviceWidth={Layout.window.width}
      deviceHeight={Layout.window.height}
      avoidKeyboard={true}
     // backdropOpacity={}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"} // You can use "height" or "position" as well
        style={styles.modalKeyboardAvoiding}
      >
        {/* <View style={styles.modalContainer}> */}
        {/* <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback> */}

        <View style={[styles.modalContent]}>{children}</View>
        {/* </View> */}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ControlModal2;

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    flex: 1,
    // borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: "auto",
    marginTop: "auto",
  },
  modalKeyboardAvoiding: {
    flex: 1,
  },

  modalContent: {
    // height: "65%",
    marginTop: "auto",
    backgroundColor: COLORS.Light.background,
    // backgroundColor: "transparent",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderWidth: 1,
    padding: 20,
    // alignItems: "center",
    // width: "100%",
    maxHeight: '90%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    // backgroundColor: COLORS.Light.colorTwentyOne,
    // position: "absolute",
    // borderWidth: 1,
    // zIndex: 2,
  },
});
