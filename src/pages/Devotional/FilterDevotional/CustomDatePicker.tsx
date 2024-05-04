import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import React, { useState } from "react";
import { COLORS, SIZES } from "../../../constants/Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { formatDate } from "../../../shared/helper";
import IonCalendarOutline from "../../../shared/assets/images/svg/ion-calendar-outline.svg";

type IProps = {
  pickSelectedDate: (date: string) => void;
};
const CustomDatePicker = ({ pickSelectedDate }: IProps) => {
  const [selectedDob, setSelectedDob] = useState<string>("");
  const [date, setDate] = useState<Date>(
    new Date(new Date().setFullYear(new Date().getFullYear()))
  );
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = formatDate(selectedDate);
    setSelectedDob(currentDate);
    pickSelectedDate(currentDate);
  };
  const eighteenYearsAgo = new Date();
  const minDate = new Date().setFullYear(eighteenYearsAgo.getFullYear() - 1);
  const formattedMinDate = new Date(minDate);
  const formattedMaxDate = new Date(
    new Date().setFullYear(eighteenYearsAgo.getFullYear() + 60)
  );
  const showDatePickerAndroid = () => {
    showMode("date");
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onDateChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: formattedMaxDate,
    });
  };

  const showDatePickerIOS = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    const formattedDate = formatDate(selectedDate);
    setSelectedDob(formattedDate);
    pickSelectedDate(formattedDate);
    hideDatePicker();
    // setTimeout(() => {}, 2000);
  };

  return (
    <>
      <IonCalendarOutline
        width={24}
        height={24}
        fill = {COLORS.Light.background}
        onPress={() => {
          Platform.OS === "android"
            ? showDatePickerAndroid()
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
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="en_GB"
            date={date}
            testID="dateTimePicker"
            is24Hour
            minimumDate={formattedMinDate}
            maximumDate={formattedMaxDate}
            accentColor={COLORS.Light.colorOne}
            textColor={COLORS.Light.colorOne}
            buttonTextColorIOS={COLORS.Light.colorOne}
          />
        </>
      )}
    </>
  );
};

export default CustomDatePicker;

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
