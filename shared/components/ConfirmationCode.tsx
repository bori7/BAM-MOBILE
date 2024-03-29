import React, {FC, useEffect} from 'react';
import {Dimensions, StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {
    CodeField,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Animated from 'react-native-reanimated';
import {COLORS} from "../../constants/Colors";
import {Text, View} from "../../components/Themed";
import CancelIcon from "../assets/images/svg/iconoir_cancel.svg";
import {useErrorAnimation} from "../lib/useErrorAnimation";


interface IConfirmationCode {
    // testID: string;
    value: string;
    setValue: (e: string) => void;
    error: boolean;
    keyboardType?: 'number-pad';
    errorMessage: string;
    isMaskedTest?: boolean;
    autoFocus?: boolean;
    containerStyles?: StyleProp<ViewStyle>;
}

const CELL_COUNT = 6;
const maxWidth = Dimensions.get('window').width;

export const ConfirmationCode: FC<IConfirmationCode> =
    ({
         errorMessage = '',
         value = '',
         setValue = () => {
         },
         error = false,
         autoFocus = true,
         keyboardType = 'number-pad',
         isMaskedTest = false,
         containerStyles,
     }) => {
        const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

        const [props, getCellOnLayoutHandler] = useClearByFocusCell({
            value,
            setValue,
        });

        useEffect(() => {
            setValue('');
        }, []);


        const errorAnimatedStyles = useErrorAnimation(error);

        return (
            <Animated.View style={[containerStyles, styles.container, errorAnimatedStyles]}>
                <CodeField
                    ref={ref}
                    {...props}
                    autoFocus={autoFocus}
                    cellCount={CELL_COUNT}
                    keyboardType={keyboardType}
                    renderCell={({index, symbol, isFocused}) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.cellRoot,
                                {borderColor: error ? COLORS.Light.colorFourteenC :
                                        // COLORS.Light.colorOne
                                    COLORS.Light.colorFifteen
                                },
                                isFocused && styles.focusCell,
                                isFocused && {borderColor: error ? COLORS.Light.colorFourteenC :
                                        COLORS.Light.colorOne
                                    // COLORS.Light.colorFifteen
                                },
                            ]}
                            onLayout={getCellOnLayoutHandler(index)}
                        >
                            <Text style={[
                                styles.cellText,
                                {color: error ? COLORS.Light.colorFourteenC : COLORS.Light.colorFifteen,}
                            ]}>
                                {symbol && isMaskedTest ? <View style={[
                                    styles.iconMaskedTest,
                                    {backgroundColor: error ? COLORS.Light.colorFourteenC : COLORS.Light.colorTwentySix},
                                ]}/> : symbol}
                            </Text>
                        </TouchableOpacity>
                    )}
                    textContentType="oneTimeCode"
                    value={value}
                    onChangeText={setValue}
                />
                {error && (
                    <View style={styles.containerError}>
                        {/*<FastImage*/}
                        {/*  resizeMode="cover"*/}
                        {/*  source={IconMark.Exclamation}*/}
                        {/*  style={styles.iconError}*/}
                        {/* */}
                        {/*  tintColor={colors.error.default}*/}
                        {/*/>*/}
                        {/*<CancelIcon width={20} height={20}/>*/}
                        <Text
                            style={styles.errorMessage}
                        >
                            {errorMessage}
                        </Text>
                    </View>
                )}
            </Animated.View>
        );
    };

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        // paddingHorizontal: 16,
        justifyContent: "space-between"
    },
    cellRoot: {
        height: 58,
        width: maxWidth * .125,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 4
    },
    cellText: {

        fontSize: 16,
        textAlign: 'center',
        // fontFamily: 'Gilroy-Regular',
        fontWeight: '600',
    },
    focusCell: {
        borderWidth: 1,
    },
    containerError: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
    },
    iconError: {
        height: '20',
        width: '20',
        marginRight: 8,
    },
    errorMessage: {
        marginRight: 16,
        color: COLORS.Light.colorFourteenC,
        fontSize: 16,
        fontWeight: '500',
        // fontFamily: 'Gilroy-Regular',
    },
    iconMaskedTest: {
        square: 8,
        borderRadius: 8,
    },
});


