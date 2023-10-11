import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Text, View } from "./Themed";
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";

import { Button, Menu } from "react-native-paper";
import { COLORS, COUNTRIES } from "../constants/Colors";
import { CountryPickerContainer } from "../types";

const CountryPicker: React.FC<CountryPickerContainer> = ({
  handleChosenCountry,
}) => {
  const [countryId, setCountryId] = useState<number>(0);
  const [visible, setVisible] = useState(false);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const handleCountrySelect = (
    selectedCountryId: React.SetStateAction<number>
  ) => {
    setCountryId(selectedCountryId);
    handleChosenCountry(selectedCountryId);
    hideMenu();
  };

  return (
    <View style={styles.countryButton}>
      <View style={styles.countryButton}>
        <Text>{`${COUNTRIES[countryId].countryFlag}  `}</Text>
        <Text
          style={styles.textSize}
        >{`+${COUNTRIES[countryId].phoneCode}   `}</Text>
      </View>
      <Menu
        visible={visible}
        onDismiss={hideMenu}
        contentStyle={styles.contentStyle}
        anchor={
          <TouchableOpacity onPress={showMenu} style={styles.anchor}>
            <Entypo
              name={`${!visible ? "chevron-down" : "chevron-up"}`}
              size={25}
              color={COLORS.Light.colorFive}
              // style={styles.textSize}
            />
          </TouchableOpacity>
        }
      >
        {COUNTRIES.map((country, idx) => (
          <TouchableOpacity
            style={styles.dropDown}
            key={idx}
            onPress={() => handleCountrySelect(idx)}
          >
            <Text>{`${country.countryFlag} `}</Text>
            <Text>{`(+${country.phoneCode})`}</Text>
          </TouchableOpacity>
        ))}
      </Menu>
    </View>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  countryButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  anchor: {
    padding: 2,
    // fontWeight: "400",
  },
  dropDown: {
    flexDirection: "row",
    margin: 5,
  },
  contentStyle: { backgroundColor: "white" },
  textSize: {
    fontWeight: "600",
    fontSize: 17,
  },
});
