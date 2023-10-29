import { StyleSheet } from "react-native";
import React from "react";
import Speaker from "../assets/images/svg/speaker.svg";
import NotePad from "../assets/images/svg/notepad.svg";
import Back10 from "../assets/images/svg/skip-backward-10.svg";
import Front10 from "../assets/images/svg/skip-forward-10.svg";

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

export const Back10SVG = () => {
  return (
    <>
      <Back10 height={30} />
    </>
  );
};

export const Front10SVG = () => {
  return (
    <>
      <Front10 height={30} />
    </>
  );
};

const styles = StyleSheet.create({});
