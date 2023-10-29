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
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { ProgressBarButton } from "../../../shared/components/ProgressBarButton";
import { Back10SVG, Front10SVG } from "../../../shared/components/SVGS";

const SpeakerModal = () => {
  const cWidth = 23;
  const [audioPercent, setAudioPercent] = useState<number>(5); //5-97.5
  const handleSetAudioPercent = (val: number) => {
    setAudioPercent(val);
  };
  const [play, setPlay] = useState<boolean>(false);
  const togglePlay = () => {
    setPlay(!play);
  };
  return (
    <>
      <View style={styles.modalHeader}>
        <View style={styles.lid} />
        <Text style={styles.modalHeaderText}>Daily Living Devotional 2023</Text>
        <Text style={styles.modalHeaderText1}>Day 265</Text>
      </View>

      <View style={styles.progressMain}>
        <View style={styles.progressInner}>
          <View
            style={[styles.progressActual, { width: `${audioPercent}%` }]}
          ></View>
        </View>
        <ProgressBarButton
          buttonStyle={styles.buttonStyle}
          cWidth={cWidth}
          pad={0}
          setExternalProgress={handleSetAudioPercent}
        ></ProgressBarButton>
      </View>
      <View style={styles.mr2}>
        <Text style={styles.mr2t1}>1:23</Text>
        <Text style={styles.mr2t2}>4:49</Text>
      </View>
      <View style={styles.mr3}>
        <TouchableOpacity>
          <Text style={styles.mr3a}>1x</Text>
        </TouchableOpacity>
        <View style={styles.mr3b}>
          <TouchableOpacity>
            <Back10SVG />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.floatingContent2}
            onPress={() => {
              togglePlay();
            }}
          >
            <Text style={styles.fc2t}>
              <FontAwesome5
                name={!play ? "play" : "pause"}
                size={28}
                color={COLORS.Light.background}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Front10SVG />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.mr3c}>VOICE</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SpeakerModal;

const styles = StyleSheet.create({
  modalHeader: {
    // borderWidth: 1,
    // flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalImage: {
    // borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: COLORS.Light.colorSeven,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 35,
  },
  modalHeaderText: {
    textAlign: "center",
    // borderWidth: 1,
    fontSize: SIZES.sizeSeven,
    marginBottom: 10,
    fontWeight: "400",
  },
  modalHeaderText1: {
    textAlign: "center",
    fontSize: SIZES.sizeSixC,
    fontWeight: "400",
    color: COLORS.Light.deepGreyColor,
    marginBottom: 20,
  },
  mr3: {
    // marginTop: 20,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // color: COLORS.Light.colorOne,
    // textAlign: "center",
    // borderWidth: 1,
  },
  mr3a: {
    color: COLORS.Light.gray,
    fontWeight: "500",
    fontSize: SIZES.sizeSevenB,
  },
  mr3b: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
  },
  mr3c: {
    color: COLORS.Light.gray,
    fontWeight: "500",
    fontSize: SIZES.sizeSeven,
  },
  lid: {
    backgroundColor: COLORS.Light.tickGray,
    height: 7,
    width: 60,
    borderRadius: 10,
    marginBottom: 30,
  },
  highlightText: {
    color: COLORS.Light.colorThree,
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "600",
  },
  buttonStyle: {
    // borderWidth: 5,
    borderColor: COLORS.Light.colorOne,
    backgroundColor: COLORS.Light.colorOne,
    position: "absolute",
  },
  progressMain: {
    // marginTop: 5,
    // marginBottom: 75,
    //   borderWidth: 1,
    //   alignItems: "center",
    justifyContent: "center",
  },
  progressInner: {
    backgroundColor: COLORS.Light.colorTwenty,
    borderRadius: 5,
    width: "100%",
  },
  progressActual: {
    backgroundColor: COLORS.Light.colorOne,
    height: 4,
    borderRadius: 5,
  },
  mr2: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mr2t1: {
    color: COLORS.Light.gray,
  },
  mr2t2: {
    color: COLORS.Light.gray,
  },
  floatingContent2: {
    height: 68,
    width: 68,
    marginHorizontal: 20,
    backgroundColor: COLORS.Light.colorOne,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.Light.colorOneLightA,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  fc2t: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginLeft: "8%",
  },
});
