import React, {useRef} from "react";
import {Text, View} from "../../components/Themed";
import {
    Alert,
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    // ActivityIndicator,
} from "react-native";
import {Feather} from "@expo/vector-icons";
import {COLORS, IMAGES, SIZES} from "../../constants/Colors";
import {ActivityIndicator} from "react-native-paper";
import WebView from "react-native-webview";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {CONSTANT_URL_CONTEXT} from "../../constants/props";
// import { ActivityIndicator } from "react-native-paper";

type ICustomPaymentProps = {
    visible: boolean;
    webUrl: string;
    closeModal: () => void;
    onDismissFunc: () => void;
    onShowFunc: () => void;
    onCancel: () => void
};

export const CustomPaymentModal = (
    {
        visible,
        closeModal,
        onDismissFunc = () => {
        },
        onShowFunc = () => {
        },
        webUrl,
        onCancel

    }: ICustomPaymentProps) => {

    const webViewRef = useRef<WebView>(null);

    const generalState = useSelector(
        (state: RootState) => state.general
    );
    const {generalData} = generalState;

    const defaultWebUrl = "https://checkout.paystack.com/b7r6ulepnufdy1i";

    // const CONSTANT_URL_CONTEXT = "paystack/callback";
    const refreshWebView = () => {
        webViewRef?.current?.reload();
    };

    const handleCloseModal = () => {
        Alert.alert(
            'Cancel Payment',
            'Are you sure you want to cancel this payment?',
            [
                {
                    text: 'No',
                    onPress: () => debug.log('Pressed Cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: () => {
                        debug.log('Pressed Yes')
                        onCancel()
                        closeModal()
                    }
                },
            ],
            {cancelable: false}
        );

    }
    const handleNavigationStateChange = async (newNavState: any) => {
        debug.log('newNavState:', newNavState);
        if (!newNavState || !newNavState.url) {
            return;
        }
        const url = newNavState.url;
        debug.log('present url:', url);

        if (url && url?.includes(CONSTANT_URL_CONTEXT)) {
            debug.log('URL matches the specific string:', url);
            closeModal();
            // setTimeout(() => {
            //
            // }, 1500);
        }
    };


    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent={true}
            onRequestClose={closeModal}
            statusBarTranslucent={true}
            onDismiss={onDismissFunc}
            onShow={onShowFunc}
        >
            <View style={styles.modalContainer}>

                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity style={styles.modalImage} onPress={handleCloseModal}>
                            <Feather name="x" size={24} color={COLORS.Light.colorOne}/>
                        </TouchableOpacity>
                        <Text style={styles.r1t2}>Payment</Text>
                        <TouchableOpacity style={styles.modalImage} onPress={refreshWebView}>
                            <Feather name="refresh-cw" size={24} color={COLORS.Light.colorOne}/>
                        </TouchableOpacity>
                    </View>

                    <WebView
                        ref={webViewRef}
                        containerStyle={styles.webViewContainer}
                        // injectedJavaScript={jsCode}
                        source={{uri: webUrl || generalData?.paymentWebUrl || defaultWebUrl}}
                        style={styles.webView}
                        // onMessage={onMessage}
                        onNavigationStateChange={handleNavigationStateChange}
                    />

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create(
    {
        modalOverlay: {
            flex: 1,
            backgroundColor: "transparent",
            // backgroundColor: COLORS.Light.colorTwentyOne,
            // position: "absolute",
            borderWidth: 1,
            // zIndex: 2,
        },
        modalContainer: {
            backgroundColor: COLORS.Light.colorTwentyOne,
            flex: 1,
            borderWidth: 1,
        },
        modalContent: {
            height: "100%",
            marginTop: "auto",
            backgroundColor: COLORS.Light.background,
            // backgroundColor: "transparent",
            // borderRadius: 20,
            // borderWidth: 1,
            padding: 15,
            // alignItems: "center",
        },
        modalHeader: {
            // borderWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            marginTop: "8%",
            justifyContent: "space-between",
            paddingVertical: 5
            // borderWidth: 1,
        },
        modalHeaderText: {
            textAlign: "center",
            fontSize: SIZES.sizeEight,
            fontWeight: "400",
            // borderWidth: 1,
        },
        modalImage: {
            width: 25,
            height: 25,
            // borderRadius: 50,
            // backgroundColor: "transparent",
            backgroundColor: COLORS.Light.background,
            alignItems: "center",
            justifyContent: "center",
            // marginRight: 35,
            // marginTop: "5%",
            // borderWidth: 1,
        },
        // modalWebViewContent: {
        //     justifyContent: "center",
        //     alignItems: "center",
        //     borderWidth: 1,
        //     position: "absolute",
        //     top: "45%",
        //     left: "35%",
        // },
        r2t: {
            width: 50,
            height: 50,
            position: "absolute",
            top: "31%",
            left: "33%",
            borderWidth: 1,
        },
        loader: {
            height: 150,
            borderWidth: 1,
            width: 150,

        },
        webViewContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            heigth: "100%",
            // borderWidth: 1,
        },
        webView: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
        },
        r1t2: {
            // marginLeft: "5%",
            // marginTop: 10,
            color: COLORS.Light.colorFour,
            fontSize: SIZES.sizeEightB,
            fontWeight: "600",
            textAlign: "center",
            // borderWidth: 1,
        },
    });
