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
import { LinearGradient } from "expo-linear-gradient";
import { MainButton } from "../../../components";

type IProps = {
  visible: boolean;
  closeModal: () => void;
  handleUpgrade: () => void;
  children?: ReactElement;
};
const SubscriptionModal = ({
  visible,
  closeModal,
  handleUpgrade,
  children,
}: IProps) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={closeModal}
      style={styles.modal}
      //   style={styles.modalContainer}
      statusBarTranslucent={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={150}
      animationOutTiming={150}
      //   backdropColor={COLORS.Light.background}
      backdropColor="transparent"
    >
      <LinearGradient
        // colors={["transparent", COLORS.Light.background]}
        colors={[COLORS.Light.colorFiveIn, COLORS.Light.background]}
        locations={[0.2052, 0.7089]}
        style={styles.gradient}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Text style={styles.t1}>
            Subscribe to get full access to all devotional contents.
          </Text>
          <Text style={styles.t2}>
            This devotional is available to The Daily Answer Subscribers only.
            Upgrade to instantly unlock this devotional.
          </Text>
          <View style={styles.r4}>
            <MainButton
              title={"Upgrade"}
              onPressFunction={() => {
                handleUpgrade();
              }}
              err={false}
              btnStyle={styles.r4btn}
              // disabled={!proceed}
            />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default SubscriptionModal;

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
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalKeyboardAvoiding: {
    flex: 1,
  },
  modalContent: {
    // height: "65%",
    marginTop: "auto",
    backgroundColor: COLORS.Light.background,
    // backgroundColor: "transparent",
    // borderWidth: 1,
    padding: 20,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    // backgroundColor: COLORS.Light.colorTwentyOne,
    // position: "absolute",
    // borderWidth: 1,
    // zIndex: 2,
  },

  gradient: {
    flex: 1,
    // backgroundColor: "transparent",
  },
  t1: {
    fontFamily: "Bitter",
    fontSize: SIZES.sizeEightA,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
  },
  t2: {
    fontSize: SIZES.sizeSixB,
    fontWeight: "300",
    textAlign: "center",
    marginVertical: 10,
  },
  r4: {
    marginVertical: 40,
    writingDirection: "rtl",
    width: "85%",
  },
  r4btn: {},
});
