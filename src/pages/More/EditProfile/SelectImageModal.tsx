import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import { formatDate } from "../../../shared/helper";
import CustomImagePicker from "./CustomImagePicker";
import { useNavigation } from "@react-navigation/native";
import {
  MoreNavigationProps,
  MoreRoutes,
} from "../../../shared/const/routerMore";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";

type IProps = {
  isModalVisible: boolean;
  setModalVisible: () => void;
  onChooseImage: (val: string) => void;
};

const SelectImageModal = ({
  isModalVisible,
  setModalVisible,
  onChooseImage = () => {},
}: IProps) => {
  //   const [isModalVisible, setModalVisible] = useState<boolean>(true);
  const navigation = useNavigation<MoreNavigationProps>();

  const toggleModal = () => {
    setModalVisible();
  };

  return (
    <View>
      <Modal
        statusBarTranslucent={true}
        isVisible={isModalVisible}
        hasBackdrop={true}
        // onBackdropPress={() => {
        //   toggleModal;
        // }}
        backdropColor={COLORS.Light.colorOverlay}
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={150}
        animationOutTiming={150}
        avoidKeyboard={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.cancelGuy}>
              <Feather
                name="x"
                size={20}
                color={COLORS.Light.colorFour}
                onPress={() => {
                  toggleModal();
                }}
              />
            </TouchableOpacity>
            <View style={styles.modalR1}>
              <View style={styles.modalR1C1}>
                <TouchableOpacity
                  style={styles.modalR1C1r}
                  onPress={() => {
                    toggleModal();
                    navigation?.navigate(MoreRoutes.ImageCapture);
                  }}
                >
                  <Text style={styles.modalR1C1tb}>{"Take photo"}</Text>
                </TouchableOpacity>
                {/* <Text style={styles.modalR1C1ta}></Text> */}
                {/* <TouchableOpacity
                  style={styles.modalR1C1r}
                  onPress={() => {
                    toggleModal();
                  }}
                > */}
                {/* <Text style={styles.modalR1C1tb}>
                    {"Choose from gallery"}
                  </Text> */}
                {/* </TouchableOpacity> */}
                <CustomImagePicker
                  setSelectedImage={(val: string): void => {
                    onChooseImage(val);
                  }}
                  onPressFunc={(): void => {
                    toggleModal();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectImageModal;

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalView: {
    // marginHorizontal: 20,
    backgroundColor: COLORS.Light.background,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    // alignItems: "center",
    // justifyContent: "center",
    width: "85%",
    // height: 150,
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    // borderWidth: 1,
  },
  modalR1: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: "10%",
    paddingBottom: "8%",
  },
  modalR1C1: {
    // width: "40%",
  },
  modalR1C1ta: {
    marginVertical: 10,
    color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSixC,
    fontWeight: "500",
    // marginRight: 10,
  },
  modalR1C1r: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  modalR1C1tb: {
    // color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSixC,
    fontWeight: "400",
    marginRight: 10,
    marginBottom: "8%",
  },
  modalR1C1tc: {},
  modalR2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  modalR2C1: {
    borderWidth: 1,
    // paddingHorizontal: 26,
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: COLORS.Light.tickGray,
    minWidth: "38%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalR2C2t1: {
    color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSeven,
    fontWeight: "500",
  },
  modalR2C2: {
    // borderWidth: 1,
    // paddingHorizontal: 26,
    paddingVertical: 10,
    borderRadius: 30,
    // borderColor: COLORS.Light.tickGray,
    minWidth: "38%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Light.colorOne,
  },
  modalR2C2t2: {
    color: COLORS.Light.background,
    fontSize: SIZES.sizeSeven,
    fontWeight: "500",
  },
  modalContainer: {
    width: "100%",
    flex: 1,
    // borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: "auto",
    marginTop: "auto",
  },
  cancelGuy: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  //   modalR1:{},
});
