import { StyleSheet } from "react-native";
import React from "react";
import Speaker from "../assets/images/svg/speaker.svg";
import NotePad from "../assets/images/svg/notepad.svg";

export const SpeakerSVG = () => {
  return (
    <>
      <Speaker height={24} />
    </>
  );
};

export const NotePadSVG = () => {
  return (
    <>
      <NotePad height={24} />
    </>
  );
};

const styles = StyleSheet.create({});
