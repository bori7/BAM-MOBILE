import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

import React, { ReactElement, useEffect, useState } from "react";
import { Text, View } from "@components/Themed";
import { COLORS, IMAGES, SIZES } from "@constants/Colors";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MainButton } from "../../../components";
import { CardAddSVG, MdiBankSVG } from "@shared/components/SVGS";
import { GivingPaymentMethodType } from "@shared/types/slices";

export type PaymentChannelType = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  type: GivingPaymentMethodType;
};

type Iprops = {
  onPressButtonFunc: () => void;
  amount: string;
  currency: string;
  paymentMethod: GivingPaymentMethodType;
  handlePaymentMethod: (val: GivingPaymentMethodType) => void;
};
const PaymentMethodModal = ({
  onPressButtonFunc = () => {},
  amount = "50,000",
  currency = "NGN",
  paymentMethod = "C",
  handlePaymentMethod = (val: GivingPaymentMethodType) => {},
}: Iprops) => {
  const [ticked, setTicked] = useState<boolean>(false);

  const paymentChannels: PaymentChannelType[] = [
    {
      icon: <CardAddSVG />,
      title: "Debit Card",
      desc: "Donate using your bank card",
      type: "C",
    },
    {
      icon: <MdiBankSVG />,
      title: "Bank Transfer",
      desc: `Donate using ${currency} bank transfer`,
      type: "T",
    },
  ];
  return (
    <View style={styles.modalHeader}>
      <View style={styles.lid} />
      <Text style={styles.modalHeaderText}>Choose payment</Text>

      <View style={styles.r2}>
        {paymentChannels.map((paymentChannel, idx) => (
          <TouchableOpacity
            style={
              paymentMethod === paymentChannel.type
                ? styles.r5Active
                : styles.r5
            }
            onPress={() => {
              handlePaymentMethod(paymentChannel.type);
            }}
            key={idx}
          >
            <View style={styles.r5m}>
              <TouchableOpacity style={styles.r5c1}>
                {paymentChannel.icon}
              </TouchableOpacity>
              <View style={styles.r5c2}>
                <Text style={styles.r5c2t1}>{paymentChannel.title}</Text>
                <Text style={styles.r5c2t2}>{paymentChannel.desc}</Text>
              </View>
            </View>
            <View style={styles.radioButton}>
              <MaterialIcons
                name={
                  paymentMethod === paymentChannel.type
                    ? "radio-button-on"
                    : "radio-button-unchecked"
                }
                size={30}
                color={COLORS.Light.colorOne}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.r4}>
        <MainButton
          title={`Pay   ${currency} ${amount}`}
          onPressFunction={() => {
            onPressButtonFunc();
          }}
          err={false}
          btnStyle={styles.r4btn}
          disabled={!amount || Number(amount) == 0}
        />
      </View>
    </View>
  );
};

export default PaymentMethodModal;

const styles = StyleSheet.create({
  modalHeader: {
    // borderWidth: 1,
    // flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  lid: {
    backgroundColor: COLORS.Light.tickGray,
    height: 7,
    width: 60,
    borderRadius: 10,
    marginBottom: 30,
  },
  r2: {
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
  },
  r2a: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeaderText: {
    textAlign: "center",
    // borderWidth: 1,
    fontSize: SIZES.sizeSevenB,
    marginBottom: 5,
    fontWeight: "600",
  },
  r4: {
    marginTop: "5%",
    writingDirection: "rtl",
    width: "100%",
    alignSelf: "flex-end",
  },
  r4btn: {},
  r5: {
    marginVertical: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    // paddingHorizontal: 5,
    paddingVertical: 15,
  },
  r5Active: {
    marginVertical: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",

    backgroundColor: COLORS.Light.colorOneLight,
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 22,
    // elevation: 20,
  },

  r5m: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  r5c1: {
    marginRight: 15,
    backgroundColor: COLORS.Light.colorOneLight,
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  radioButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  r5c2: {
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  r5c2t1: {
    fontWeight: "500",
    fontSize: SIZES.sizeSixB,
    marginBottom: 5,
  },
  r5c2t2: {
    fontWeight: "400",
    fontSize: SIZES.sizeSix,
    color: COLORS.Light.deeperGreyColor,
    // marginTop: 5,
  },
});
