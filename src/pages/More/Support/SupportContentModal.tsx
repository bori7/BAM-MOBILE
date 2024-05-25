import {
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    TouchableOpacity,
} from "react-native";

import React, {ReactElement, useEffect, useState} from "react";
import {Text, View} from "@components/Themed";
import {COLORS, IMAGES, SIZES} from "@constants/Colors";
import {Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {MainButton} from "../../../components";
import {CardAddSVG, MdiBankSVG} from "@shared/components/SVGS";
import {GivingPaymentMethodType} from "@shared/types/slices";
import {EmailSupport, PrivacyPolicy, TermsOfService} from "@constants/values";
import {nanoid} from "@reduxjs/toolkit";

export type PaymentChannelType = {
    icon: React.ReactNode;
    title: string;
    desc: string;
    type: GivingPaymentMethodType;
};

type Iprops = {
    // onPressButtonFunc: () => void;
    content: number;
    // currency: string;
    // paymentMethod: GivingPaymentMethodType;
    // handlePaymentMethod: (val: GivingPaymentMethodType) => void;
};
const SupportContentModal = ({content}: Iprops) => {
    const [ticked, setTicked] = useState<boolean>(false);

    const paymentChannels: PaymentChannelType[] = [
        {
            icon: <CardAddSVG/>,
            title: "Debit Card",
            desc: "Give using your bank card",
            type: "C",
        },
        {
            icon: <MdiBankSVG/>,
            title: "Bank Transfer",
            desc: `Give using  bank transfer`,
            type: "T",
        },
    ];
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            // style={styles.scroll}

        >
            <View style={styles.modalHeader}>
                <View style={styles.lid}/>
                <Text style={styles.modalHeaderText}>{
                    `${content == 1 ? "Email Support" : (content == 3 ? "Terms of Service" : content == 4 && "Privacy Policy")}`
                }</Text>

                <View style={styles.r2}>
                    {content == 1 && (
                        <>
                            {EmailSupport.map(
                                (es, idx) => (
                                    <View key={nanoid()}>
                                        <Text style={styles.fv3}>{es.subtitle}</Text>
                                        <Text style={styles.fv4}>
                                            {es.text}
                                        </Text>
                                    </View>
                                )
                            )}
                        </>

                    )}

                    {content == 3 && (
                        <>
                            {TermsOfService.map(
                                (tos, idx) => (
                                    <View key={nanoid()}>
                                        <Text style={styles.fv3}>{tos.subtitle}</Text>
                                        <Text style={styles.fv4}>
                                            {tos.text}
                                        </Text>
                                    </View>
                                )
                            )}
                        </>

                    )}
                    {content == 4 && (
                        <>
                            {PrivacyPolicy.map(
                                (pp, idx) => (
                                    <View key={nanoid()}>
                                        <Text style={styles.fv3}>{pp.subtitle}</Text>
                                        <Text style={styles.fv4}>
                                            {pp.text}
                                        </Text>
                                    </View>
                                )
                            )}
                        </>

                    )}

                </View>
            </View>
        </ScrollView>
    );
};

export default SupportContentModal;

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
    scroll: {
        // borderWidth: 1,
        width: "100%",
        marginVertical: 10,
        backgroundColor: "transparent",
        paddingVertical: "5%",
    },
    scrollContent: {
        width: "100%",
        // height: "100%",
        alignItems: "center",
        backgroundColor: "transparent",
        // marginBottom: 50,
        // paddingVertical: 5,
        paddingBottom: "5%",
        // maxHeight: "90%"
    },

    modalHeaderText: {
        textAlign: "left",
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
    fv3: {
        marginTop: 5,
        alignSelf: "flex-start",
        fontWeight: "500",
        fontSize: SIZES.sizeSixC,
    },
    fv4: {
        marginVertical: 20,
        // lineHeight: 22,
    },
});
