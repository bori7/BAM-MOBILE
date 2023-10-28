import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import React, { ReactElement, useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";

type IProps = {
  visible: boolean;
  closeModal: () => void;
  children?: ReactElement;
};
const ControlModal = ({ visible, closeModal, children }: IProps) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

export default ControlModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.Light.colorOverlay,
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
