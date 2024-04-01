import {
  Animated,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { PanGestureHandler, State } from "react-native-gesture-handler";

type IProps = {
  visible: boolean;
  closeModal: () => void;
  children?: ReactElement;
};
const ControlModal = ({ visible, closeModal, children }: IProps) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: {
    nativeEvent: { state: number; translationY: number };
  }) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > 100) {
        closeModal();
        translateY.setValue(0);
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    }
  };

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
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: translateY }] },
            ]}
          >
            {children}
          </Animated.View>
        </PanGestureHandler>
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
    height: "65%",
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
