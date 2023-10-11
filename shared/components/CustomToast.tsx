import React from "react";
import { View, Image, Text, StyleSheet, ImageBackground } from "react-native";
import { COLORS, IMAGES } from "../../constants/Colors";
import RiseLogoSVG from "../../shared/assets/images/svg/riselogo.svg";

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
      <ImageBackground style={styles.toastContainer} source={IMAGES.HomeBg}>
        <View style={styles.toastBody}>
          <View style={styles.toastImage}>
            <RiseLogoSVG
              fill={COLORS.Light.background}
              width={15}
              height={15}
            />
          </View>
          <Text style={styles.toastHeaderText}>Bible App</Text>
        </View>
        <View style={styles.toastContent}>
          {/* <Text style={styles.errorText}>
          {toast.type === "success" ? "Success" : "Error"}
        </Text> */}
        </View>
        <Text style={toast.textStyle}>{toast.message}</Text>
      </ImageBackground>
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
    alignItems: "flex-end",
    marginBottom: 3,
    width: "100%",
    // borderWidth: 1,
  },
  toastHeaderText: {
    color: "black",
    fontWeight: "300",
    fontSize: 15,
    marginLeft: 5,
  },
  toastContent: {
    marginVertical: 5,
  },
  errorText: {
    color: "black",
    fontWeight: "bold",
  },
  toastImage: {
    width: 20,
    height: 20,
    // borderColor: COLORS.Light.colorTwentyFive,
    borderRadius: 5,
    backgroundColor: COLORS.Light.colorOne,
    alignItems: "center",
    justifyContent: "center",
  },
});
