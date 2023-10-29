import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { COLORS, IMAGES, SIZES } from "../../constants/Colors";

function CustomToast({ toast }: any) {
  return (
    <View
      style={[
        styles.toastMain,
        {
          borderColor:
            toast.type === "success"
              ? COLORS.Light.colorOne
              : COLORS.Light.colorFourteen,
        },
      ]}
    >
      <View style={styles.toastContainer}>
        <View style={styles.toastBody}>
          <View style={styles.toastImageContainer}>
            <Image source={IMAGES.logoDailyAnswer} style={styles.toastImage} />
          </View>
          {/* <BAMLogoSVG fill={COLORS.Light.background} width={15} height={15} /> */}

          <Text style={styles.toastHeaderText}>Bible App</Text>
        </View>
        <View style={styles.toastContent}>
          {/* <Text style={styles.errorText}>
          {toast.type === "success" ? "Success" : "Error"}
        </Text> */}
        </View>
        <Text style={toast.textStyle}>{toast.message}</Text>
      </View>
    </View>
  );
}

export default CustomToast;

const styles = StyleSheet.create({
  toastMain: {
    flex: 1,
    width: "95%",
    backgroundColor: COLORS.Light.background,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 5,
  },

  toastContainer: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    // borderWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    resizeMode: "cover",
  },
  toastBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 3,
    width: "100%",
    justifyContent: "flex-start",
    // borderWidth: 1,
  },
  toastHeaderText: {
    color: "black",
    fontWeight: "500",
    fontSize: SIZES.sizeSeven,
    marginLeft: 5,
    textAlign: "center",
    marginTop: 6,
  },
  toastContent: {
    marginVertical: 5,
  },
  errorText: {
    color: "black",
    fontWeight: "bold",
  },
  toastImageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  toastImage: {
    width: 30,
    height: 30,
    // borderColor: COLORS.Light.colorTwentyFive,
    borderRadius: 5,
    // backgroundColor: COLORS.Light.colorOne,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
