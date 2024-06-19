import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {Button, Menu, Divider} from "react-native-paper";
import {Text, View} from "./Themed";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {COLORS} from "../constants/Colors";

type IProps = {
    hideMenu: boolean;
    items: string[];
    openMenu: () => void;
    closeMenu: () => void;
    setSelectedItemIndex: (idx: number) => void;
    selectedItemIndex: number;
};

const DropDownInput = ({
                           hideMenu,
                           items = ["Item 1", "Item 2", "Item 3"],
                           openMenu = () => {
                           },
                           closeMenu = () => {
                           },
                           setSelectedItemIndex = (idx: number) => {
                           },
                           selectedItemIndex = 0,
                       }: IProps) => {
    //   const [visible, setVisible] = useState(false);
    //   const [selectedItem, setSelectedItem] = useState<string>("");

    const handleMenuItemPress = (item: number) => {
        setSelectedItemIndex(item);
        closeMenu();
    };

    return (
        <View style={styles.container}>
            <Menu
                visible={hideMenu}
                onDismiss={closeMenu}
                anchor={
                    <Ionicons
                        name={hideMenu ? "ios-caret-up" : "ios-caret-down"}
                        size={18}
                        color={COLORS.Light.colorFour}
                        onPress={openMenu}
                    />
                }
                contentStyle={styles.menuContainer}
            >
                {items.map((item, index) => (
                    <Menu.Item
                        key={index}
                        titleStyle={{color: COLORS.Light.colorFour}}
                        onPress={() => handleMenuItemPress(index)}
                        title={
                            <Text style={{color: COLORS.Light.colorFour}}>{item}</Text>
                        }
                        style={
                            selectedItemIndex === index
                                ? styles.menuItemSelected
                                : styles.menuItem
                        }
                        leadingIcon={() => (
                            <View style={styles.radioButton}>
                                <MaterialIcons
                                    name={
                                        selectedItemIndex === index
                                            ? "radio-button-on"
                                            : "radio-button-unchecked"
                                    }
                                    size={24}
                                    color={COLORS.Light.colorOne}
                                />
                            </View>
                        )}
                    />
                ))}
                <Divider/>
            </Menu>
        </View>
    );
};

export default DropDownInput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    menuContainer: {
        backgroundColor: COLORS.Light.background,

        // backgroundColor: "transparent",
        // borderWidth: 1,
        // width:
    },
    menuItem: {
        // borderWidth: 1,
        backgroundColor: "transparent",
        marginBottom: 8,
        // borderColor: COLORS.Light.colorOne,
        // borderRadius: 5,
        // paddingVertical: 10,
        height: 52,
    },
    menuItemSelected: {
        borderWidth: 1,
        backgroundColor: COLORS.Light.colorOneLight,
        marginBottom: 8,
        borderColor: COLORS.Light.colorOne,
        borderRadius: 5,
        // paddingVertical: 10,
        height: 52,
        marginHorizontal: 3,
    },
    radioButton: {
        backgroundColor: "transparent",
    },
});
