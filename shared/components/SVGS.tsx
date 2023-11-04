import { StyleSheet } from "react-native";
import React from "react";
import Speaker from "../assets/images/svg/speaker.svg";
import NotePad from "../assets/images/svg/notepad.svg";
import Back10 from "../assets/images/svg/skip-backward-10.svg";
import Front10 from "../assets/images/svg/skip-forward-10.svg";
import MoreCreditCard from "../assets/images/svg/more_credit-card.svg";
import MoreProfile from "../assets/images/svg/more_profile.svg";
import MoreAbout from "../assets/images/svg/more-about-circle-outline.svg";
import HandsPraying from "../assets/images/svg/more-hands-praying-duotone.svg";
import CalendarHeart from "../assets/images/svg/more-interface-calendar-heart-calendar-date-day-favorite-heart-like-month.svg";
import MoreGiving from "../assets/images/svg/more-interface-favorite-give-heart-reward-social-rating-media-heart-hand.svg";
import MoreNotesOutline from "../assets/images/svg/more-notes-outline.svg";
import MoreSettings from "../assets/images/svg/more-settings-24-regular.svg";
import MoreSupport from "../assets/images/svg/more-support.svg";
import MdiNaira from "../assets/images/svg/mdi_naira.svg";
import SendMailImage from "../assets/images/svg/send_mail2.svg";
import Success from "../assets/images/svg/success.svg";
import CardAdd from "../assets/images/svg/cardadd.svg";
import MdiBank from "../assets/images/svg/mdi-bank-outline.svg";
import RewardHeart from "../assets/images/svg/give-reward-heart-hand.svg";
import { COLORS } from "../../constants/Colors";

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
export const Front10SVG = () => {
  return (
    <>
      <Front10 height={30} />
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

export const MoreCreditCardSVG = () => {
  return (
    <>
      <MoreCreditCard height={30} />
    </>
  );
};

export const MoreProfileSVG = () => {
  return (
    <>
      <MoreProfile height={34} width={28} />
    </>
  );
};
export const MoreAboutSVG = () => {
  return (
    <>
      <MoreAbout height={30} />
    </>
  );
};
export const HandsPrayingSVG = () => {
  return (
    <>
      <HandsPraying height={30} />
    </>
  );
};
export const CalendarHeartSVG = () => {
  return (
    <>
      <CalendarHeart height={30} />
    </>
  );
};
export const MoreGivingSVG = () => {
  return (
    <>
      <MoreGiving height={30} />
    </>
  );
};
export const MoreNotesOutlineSVG = () => {
  return (
    <>
      <MoreNotesOutline height={30} />
    </>
  );
};
export const MoreSettingSVG = () => {
  return (
    <>
      <MoreSettings height={30} />
    </>
  );
};
export const MoreSupportSVG = () => {
  return (
    <>
      <MoreSupport height={30} />
    </>
  );
};

export const MdiNairaSVG = ({ color }: { color?: string }) => {
  return (
    <>
      <MdiNaira
        // height={19}
        width={25}
        // color={COLORS.Light.deepGreyColor}
        stroke={color || COLORS.Light.deepGreyColor}
        // strokeWidth={0.9}
        // style={{
        //   borderWidth: 1,
        //   // : COLORS.Light.deepGreyColor,
        // }}
      />
    </>
  );
};

export const SendMailImageSVG = () => {
  return (
    <>
      <SendMailImage
      // height={19}
      // width={25}
      // style={{ borderWidth: 1 }}
      />
    </>
  );
};

export const SuccessSVG = () => {
  return (
    <>
      <Success
        width={65}
        height={65}
        // style={{ borderWidth: 1 }}
      />
    </>
  );
};

export const CardAddSVG = () => {
  return (
    <>
      <CardAdd height={30} width={30} />
    </>
  );
};

export const MdiBankSVG = () => {
  return (
    <>
      <MdiBank height={30} width={30} />
    </>
  );
};

export const RewardHeartSVG = () => {
  return (
    <>
      <RewardHeart height={80} width={80} />
    </>
  );
};

const styles = StyleSheet.create({});
