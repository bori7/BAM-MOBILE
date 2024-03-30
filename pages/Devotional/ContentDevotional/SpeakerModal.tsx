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
import { OptionsPopUp } from "../../Main/Home/OptionsPopUp";
import {getDaysElapsed} from "../../../shared/helper";

type ISpeedProps = "0.75x" | "1x" | "1.25x" | "1.5x" | "2x";
type IVoiceProps = "Male" | "Female";
type ISpeedsProps = {
  name: ISpeedProps;
};
type IVoicesProps = {
  name: IVoiceProps;
};
const SpeakerModal = () => {
  const cWidth = 23;
  const speeds: ISpeedsProps[] = [
    {
      name: "0.75x",
    },
    {
      name: "1x",
    },
    {
      name: "1.25x",
    },
    {
      name: "1.5x",
    },
    {
      name: "2x",
    },
  ];
  const voices: IVoicesProps[] = [
    {
      name: "Male",
    },
    {
      name: "Female",
    },
  ];
  const [audioPercent, setAudioPercent] = useState<number>(23); //5-97.5
  const handleSetAudioPercent = (val: number) => {
    setAudioPercent(val);
  };
  const [play, setPlay] = useState<boolean>(false);
  const [speed, setSpeed] = useState<ISpeedProps>("1x");
  const [voice, setVoice] = useState<IVoiceProps>("Male");
  const [hideSpeed, setHideSpeed] = useState<boolean>(false);
  const [hideVoice, setHideVoice] = useState<boolean>(false);
  const togglePlay = () => {
    setPlay(!play);
  };
  return (
    <>
      <View style={styles.modalHeader}>
        <View style={styles.lid} />
        <Text style={styles.modalHeaderText}>{`Daily Living Devotional ${new Date().getFullYear()}`}</Text>
        <Text style={styles.modalHeaderText1}>{`Day ${getDaysElapsed()}`}</Text>
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
          initialPercentage={audioPercent}
        ></ProgressBarButton>
      </View>
      <View style={styles.mr2}>
        <Text style={styles.mr2t1}>1:23</Text>
        <Text style={styles.mr2t2}>4:49</Text>
      </View>
      <View style={styles.mr3}>
        <TouchableOpacity
          onPress={() => {
            setHideSpeed(!hideSpeed);
          }}
        >
          <Text style={styles.mr3a}>{speed}</Text>
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
        <TouchableOpacity
          onPress={() => {
            setHideVoice(!hideVoice);
          }}
        >
          <Text style={styles.mr3c}>VOICE</Text>
        </TouchableOpacity>
        {hideSpeed && (
          <OptionsPopUp
            bstyle={styles.bSstyle}
            xstyle={styles.xSstyle}
            children={
              <>
                <Text
                  style={[
                    styles.optionSText,
                    {
                      padding: "4%",
                      fontWeight: "600",
                    },
                  ]}
                >
                  Speed
                </Text>
                {speeds.map((option, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.optionSBody}
                    onPress={() => {
                      setHideSpeed(!hideSpeed);
                      setSpeed(option.name);
                    }}
                  >
                    <Text style={styles.optionSText}>{option.name}</Text>
                    {option.name === speed && (
                      <Feather
                        name="check"
                        size={24}
                        color={COLORS.Light.colorFour}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </>
            }
          />
        )}
        {hideVoice && (
          <OptionsPopUp
            bstyle={styles.bvstyle}
            xstyle={styles.xvstyle}
            children={
              <>
                <Text
                  style={[
                    styles.optionvText,
                    {
                      padding: "4%",
                      fontWeight: "600",
                    },
                  ]}
                >
                  Voice
                </Text>

                {voices.map((option, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.optionvBody}
                    onPress={() => {
                      setHideVoice(!hideVoice);
                      setVoice(option.name);
                    }}
                  >
                    <Text style={styles.optionvText}>{option.name}</Text>
                    {option.name === voice && (
                      <Feather
                        name="check"
                        size={24}
                        color={COLORS.Light.colorFour}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </>
            }
          />
        )}
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
  xvstyle: {
    width: 180,
    // height: 190,
    top: -150,
    right: -15,
    borderRadius: 10,
    // borderWidth: 2,
    shadowColor: COLORS.Light.greyText,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  bvstyle: {
    paddingVertical: "10%",
    paddingHorizontal: "8%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    borderColor: COLORS.Light.hashBackGround,
    borderWidth: 2,
    height: 180,
  },
  optionvBody: {
    padding: "5%",
    marginVertical: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  optionvText: {
    fontSize: SIZES.sizeSeven,
    // fontWeight: "600",
  },
  xSstyle: {
    width: 180,
    // height: 190,
    top: -250,
    left: -5,
    borderRadius: 10,
    // borderWidth: 2,
    shadowColor: COLORS.Light.greyText,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  bSstyle: {
    paddingVertical: "10%",
    paddingHorizontal: "8%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    borderColor: COLORS.Light.hashBackGround,
    borderWidth: 2,
    // height: 180,
  },
  optionSBody: {
    padding: "5%",
    marginVertical: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  optionSText: {
    fontSize: SIZES.sizeSeven,
    // fontWeight: "600",
  },
});
