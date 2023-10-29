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
import { notesActions } from "../../../store/slices/notes";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { TextInput } from "react-native-paper";

type Iprops = {
  noteTitle: string;
  setModalVisible: () => void;
};

const NotesModal = ({ setModalVisible, noteTitle }: Iprops) => {
  const [noteText, setNoteText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    setModalVisible();
  };

  const addNote = () => {
    if (!noteTitle || !noteText) {
      return;
    }
    dispatch(
      notesActions.updateOrAddNote({
        uid: "",
        title: noteTitle,
        text: noteText,
        datetime: "",
        date: "",
        time: "",
      })
    );
    closeModal();
  };

  return (
    <View style={styles.modalHeader}>
      <View style={styles.r1}>
        <Text style={styles.r1t}>Understand Your Identity</Text>
      </View>
      <View style={styles.r2}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scroll}
        >
          <View style={styles.headerRC2t2}>
            <TextInput
              mode="outlined"
              placeholder={"What would you like to write?"}
              placeholderTextColor={COLORS.Light.greyText}
              textContentType="none"
              style={{ ...styles.inputContent }}
              keyboardType="default"
              autoCapitalize="none"
              multiline
              autoCorrect={false}
              selectionColor={COLORS.Light.colorOne}
              outlineColor={"transparent"}
              activeOutlineColor={"transparent"}
              value={noteText}
              onChangeText={(val) => {
                setNoteText(val);
              }}
              // onFocus={() => {
              //   setHideStatusBar(true);
              // }}
              // onBlur={() => {
              //   setHideStatusBar(false);
              // }}
            />
          </View>
        </ScrollView>
        <View style={styles.modalR2}>
          <TouchableOpacity onPress={closeModal} style={styles.modalR2C1}>
            <Text style={styles.modalR2C2t1}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalR2C2}
            onPress={() => {
              addNote();
            }}
          >
            <Text style={styles.modalR2C2t2}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotesModal;

const styles = StyleSheet.create({
  modalHeader: {
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  r1: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: COLORS.Light.tickGray,
    borderBottomWidth: 2,
    width: "150%",
    paddingTop: 10,
    paddingBottom: 20,
  },
  r1t: {
    fontSize: SIZES.sizeEight,
    fontWeight: "500",
  },
  r2: {
    paddingVertical: 30,
    // borderWidth: 2,
    width: "100%",
    minHeight: 250,
  },
  modalR2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  modalR2C1: {
    borderWidth: 1,
    // paddingHorizontal: 26,
    paddingVertical: 12,
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
    paddingVertical: 12,
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
  headerRC2t2: {
    width: "100%",
    backgroundColor: "transparent",
    // borderWidth: 1,
    // height: "250%",
    alignItems: "center",
  },
  inputContent: {
    color: COLORS.Light.colorFour,
    width: "100%",
    backgroundColor: "transparent",
    // fontSize: SIZES.sizeEight,
    fontWeight: "400",
    // borderWidth: 1,
    // alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    fontSize: SIZES.sizeEight,
  },
  scroll: {
    // borderWidth: 1,
    width: "100%",
    backgroundColor: "transparent",
    paddingBottom: "5%",
    zIndex: 5,
  },
  scrollContent: {
    width: "100%",
    // height: "100%",
    alignItems: "flex-start",
    backgroundColor: "transparent",
    // marginBottom: 50,
    // paddingVertical: 5,
    // paddingBottom: "3%",
    // marginBottom: "8%",
  },
});
