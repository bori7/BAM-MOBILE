import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import React, { useState } from "react";
import { COLORS, SIZES } from "../../../constants/Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { convertTo12HourFormat, formatDate } from "../../../shared/helper";
import IonCalendarOutline from "../../../shared/assets/images/svg/ion-calendar-outline.svg";
import { AntDesign } from "@expo/vector-icons";
import { timeOptions } from "../../../constants/values";

type IProps = {
  pickSelectedTime: (date: string) => void;
};
const ClockModal = ({ pickSelectedTime }: IProps) => {
  const [selectedDob, setSelectedDob] = useState<string>("");
  const [date, setDate] = useState<Date>(
    new Date(new Date().setFullYear(new Date().getFullYear()))
  );
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const onTimeChange = (event: any, selectedDate: Date | undefined) => {
    // const formattedTime = selectedDate
    //   .toLocaleTimeString("en-US", timeOptions)
    //   ?.toLocaleUpperCase();
    let formattedTime = (selectedDate || new Date())
      .toLocaleTimeString("en-US", timeOptions)
      ?.toLocaleUpperCase();
    formattedTime = convertTo12HourFormat(formattedTime);
    console.log(formattedTime);
    setSelectedDob(formattedTime);
    pickSelectedTime(formattedTime);
  };
  const eighteenYearsAgo = new Date();
  const minDate = new Date().setFullYear(eighteenYearsAgo.getFullYear() - 1);
  const formattedMinDate = new Date(minDate);
  const formattedMaxDate = new Date(
    new Date().setFullYear(eighteenYearsAgo.getFullYear() + 60)
  );
  const showDatePickerAndroid = () => {
    showMode("time");
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onTimeChange,
      mode: currentMode,
      is24Hour: false,
      maximumDate: formattedMaxDate,
      display: "clock",
      //   optio
      //   accentColor: COLORS.Light.colorOne
      positiveButton: {
        textColor: COLORS.Light.colorOne,
      },
      neutralButton: {
        textColor: COLORS.Light.colorOne,
      },
      negativeButton: {
        textColor: COLORS.Light.colorOne,
      },
    });
  };

  const showDatePickerIOS = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    const formattedTime = selectedDate
      .toLocaleTimeString(undefined, timeOptions)
      ?.toLocaleUpperCase();
    console.log(formattedTime);
    setSelectedDob(formattedTime);
    pickSelectedTime(formattedTime);
    hideDatePicker();

    // setTimeout(() => {}, 2000);
  };

  return (
    <>
      {/* <IonCalendarOutline
        width={24}
        height={24}
        onPress={() => {
          Platform.OS === "android"
            ? showDatePickerAndroid()
            : showDatePickerIOS();
        }}
      /> */}
      <AntDesign
        name="caretdown"
        size={18}
        color={COLORS.Light.colorFour}
        onPress={() => {
          Platform.OS === "android"
            ? // showDatePickerIOS()
              showDatePickerAndroid()
            : showDatePickerIOS();
        }}
      />
      {Platform.OS === "android" ? (
        <>
          {/* <TextInput
            mode="outlined"
            // label={"Date of Birth"}
            placeholder={"Choose date"}
            placeholderTextColor={COLORS.Light.colorTwentySeven}
            value={selectedDob}
            editable={false}
            selectionColor={COLORS.Light.colorOne}
            outlineColor={COLORS.Light.colorTwentySix}
            activeOutlineColor={COLORS.Light.colorOne}
            style={{ ...styles.inputContent }}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon={"calendar-month"}
                color={COLORS.Light.colorOne}
                onPress={showDatePickerAndroid}
              />
            }
          /> */}
          {/* <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="en_GB"
            date={date}
            testID="dateTimePicker"
            is24Hour={false}
            minimumDate={formattedMinDate}
            maximumDate={formattedMaxDate}
            accentColor={COLORS.Light.colorOne}
            textColor={COLORS.Light.colorOne}
            timePickerModeAndroid={"spinner"}
            // pickerStyleIOS={{
            //   backgroundColor: COLORS.Light.colorOne,
            // }}
            // backdropStyleIOS={{
            //   backgroundColor: COLORS.Light.colorOne,
            // }}
            // customPickerIOS
            // display="calendar"
            // confirmTextIOS="OKA"
            collapsable={true}
            buttonTextColorIOS={COLORS.Light.colorOne}
          /> */}
        </>
      ) : (
        <>
          {/* <TextInput
            mode="outlined"
            // label={"Date of Birth"}
            placeholder={"Choose date"}
            placeholderTextColor={COLORS.Light.colorTwentySeven}
            value={selectedDob}
            selectionColor={COLORS.Light.colorOne}
            outlineColor={COLORS.Light.colorTwentySix}
            activeOutlineColor={COLORS.Light.colorOne}
            style={{ ...styles.inputContent }}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon={"calendar-month"}
                color={COLORS.Light.colorOne}
                onPress={showDatePickerIOS}
              />
            }
          /> */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="en_GB"
            date={date}
            testID="dateTimePicker"
            is24Hour={true}
            minimumDate={formattedMinDate}
            maximumDate={formattedMaxDate}
            accentColor={COLORS.Light.colorOne}
            textColor={COLORS.Light.colorOne}
            timePickerModeAndroid={"spinner"}
            // pickerStyleIOS={{
            //   backgroundColor: COLORS.Light.colorOne,
            // }}
            // backdropStyleIOS={{
            //   backgroundColor: COLORS.Light.colorOne,
            // }}
            // customPickerIOS
            // display="calendar"
            confirmTextIOS="OK"
            collapsable={true}
            buttonTextColorIOS={COLORS.Light.colorOne}
          />
        </>
      )}

      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="en_GB"
        date={date}
        testID="dateTimePicker"
        is24Hour={true}
        minimumDate={formattedMinDate}
        maximumDate={formattedMaxDate}
        accentColor={COLORS.Light.colorOne}
        textColor={COLORS.Light.colorOne}
        timePickerModeAndroid={"spinner"}
        // pickerStyleIOS={{
        //   backgroundColor: COLORS.Light.colorOne,
        // }}
        // backdropStyleIOS={{
        //   backgroundColor: COLORS.Light.colorOne,
        // }}
        // customPickerIOS
        // display="calendar"
        confirmTextIOS="OK"
        collapsable={true}
        buttonTextColorIOS={COLORS.Light.colorOne}
      /> */}
    </>
  );
};

export default ClockModal;

const styles = StyleSheet.create({
  inputContent: {
    fontSize: SIZES.sizeSix,
    fontWeight: "600",
    color: COLORS.Light.colorTwentySeven,
    width: "100%",
    backgroundColor: COLORS.Light.background,
    marginBottom: 18,
  },
});
