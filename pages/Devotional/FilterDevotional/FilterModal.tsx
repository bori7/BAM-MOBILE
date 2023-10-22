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
import { COLORS, IMAGES, SIZES } from "../../../constants/Colors";
import CustomDatePicker from "./CustomDatePicker";

type Iprops = {
  isModalVisible: boolean;
  setModalVisible: () => void;
  onSave: () => void;
};

const FilterModal = ({ isModalVisible, setModalVisible, onSave }: Iprops) => {
  //   const [isModalVisible, setModalVisible] = useState<boolean>(true);

  const toggleModal = () => {
    setModalVisible();
  };

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  return (
    <View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
        statusBarTranslucent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalR1}>
              <View style={styles.modalR1C1}>
                <Text style={styles.modalR1C1ta}>From Date:</Text>
                <TouchableOpacity style={styles.modalR1C1r}>
                  <Text style={styles.modalR1C1tb}>{fromDate}</Text>
                  <CustomDatePicker
                    pickSelectedDate={(val) => {
                      setFromDate(val);
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalR1C1}>
                <Text style={styles.modalR1C1ta}>To Date:</Text>
                <TouchableOpacity style={styles.modalR1C1r}>
                  <Text style={styles.modalR1C1tb}>{toDate}</Text>
                  <CustomDatePicker
                    pickSelectedDate={(val) => {
                      setToDate(val);
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalR2}>
              <TouchableOpacity onPress={toggleModal} style={styles.modalR2C1}>
                <Text style={styles.modalR2C2t1}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalR2C2}
                onPress={() => {
                  onSave();
                  toggleModal();
                }}
              >
                <Text style={styles.modalR2C2t2}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.Light.modalOverlay,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.Light.background,
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    // justifyContent: "center",
    width: "85%",
    // height: "23%",
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalR1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10%",
  },
  modalR1C1: {
    width: "40%",
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
  },
  modalR1C1tb: {
    // color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSixB,
    fontWeight: "400",
    marginRight: 10,
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
  //   modalR2C2t:{},
  //   modalR1:{},
});
