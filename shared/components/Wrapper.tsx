import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, Platform, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useToast} from "react-native-toast-notifications";
import {RootState, AppDispatch} from "../../store";
import {COLORS, SIZES} from "../../constants/Colors";
import {CustomLoadingModal} from "./CustomLoadingModal";
import {screenNotificationActions} from "../../store/slices/notification";
import {SafeAreaView} from "react-native-safe-area-context";
import {userActions} from "../../store/slices/user";
import {devotionalActions} from "../../store/slices/devotional";
import {notesActions} from "../../store/slices/notes";
import {prayersActions} from "../../store/slices/prayer";

type props = {
    child: any;
};

export default function Wrapper({child}: props) {
    const toast = useToast();
    const dispatch = useDispatch<AppDispatch>();
    // const [visible, setVisible] = useState(true);

    const Toaster = (
        type = "success",
        message = "Bible App Auth...",
        onShownFunc = () => {
        },
        duration = 4000
    ) => {
        debug.log("Toast type: ", type + " via Wrapper");
        debug.log("Toast message: ", message + " via Wrapper");


        if (toast !== undefined && Object.keys(toast).length) {
            toast?.show(message, {
                type: type === "error" ? "danger" : type,
                placement: "top",
                duration: duration,
                animationType: "slide-in",
                textStyle: {
                    fontSize: SIZES.sizeSix,
                    fontWeight: "500",
                    justifyContent: "center",
                    color:
                        type === "success"
                            ? COLORS.Light.colorOne
                            : COLORS.Light.colorThree,
                    marginVertical: 2,
                },
                onClose: () => {
                    debug.log("Toast Hidden via Wrapper");
                    onShownFunc();
                },
            });
        }
    };

    const userState = useSelector((state: RootState) => state.user);
    const {userError, userMessage, userLoading} = userState;

    const noteState = useSelector((state: RootState) => state.notes);
    const {notesError, notesMessage, notesLoading} = noteState;

    const prayerState = useSelector((state: RootState) => state.prayer);
    const {prayersError, prayersMessage, prayersLoading} = prayerState;

    const generalState = useSelector((state: RootState) => state.general);
    const {generalLoading} = generalState;

    const devotionalState = useSelector((state: RootState) => state.devotional);
    const {devotionalLoading, devotionalError} = devotionalState;

    const screenNotificationState = useSelector(
        (state: RootState) => state.screenNotification
    );
    const {screenLoading, screenFunction, notificationData} =
        screenNotificationState;


    useEffect(() => {
        if (notificationData !== null) {
            Toaster("success", notificationData?.message, () => {
                dispatch(screenNotificationActions.clearNotificationState());
            });
        }
        if (userMessage) {
            Toaster("success", userMessage, () => {
                dispatch(userActions.clearUserMessage())
            });
        }

        if (userError !== null) {
            Toaster("error", userError?.message, () => {
                dispatch(userActions.clearUserError())
            });
        }

        if (notesError !== null) {
            Toaster("error", notesError?.message, () => {
                dispatch(notesActions.clearNotesError())
            });
        }

        if (prayersError !== null) {
            Toaster("error", prayersError?.message, () => {
                dispatch(prayersActions.clearPrayersError())
            });
        }

        if (devotionalError !== null) {
            Toaster("error", devotionalError?.message, () => {
                dispatch(devotionalActions.clearDevotionalError())
            });
        }

        // if (planMessage) {
        //   Toaster("success", planMessage, () => {});
        // }
    }, [notificationData, userError, userMessage, devotionalError, notesError, prayersError]);

    useEffect(() => {
    }, []);

    return (
        <View style={[{height: "100%"}]}>
            <View style={{height: "100%"}}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{flex: 1}}
                    keyboardVerticalOffset={5}
                >
                    <View style={{height: "100%", width: "100%"}}>{child}</View>
                    <CustomLoadingModal
                        visible={screenLoading || userLoading || generalLoading || notesLoading}
                        closeModal={() => {
                            dispatch(
                                screenNotificationActions.updateScreenLoadingFunc({
                                    screenLoading: false,
                                    screenFunction: () => {
                                    },
                                })
                            );
                        }}
                        onDismissFunc={screenFunction}
                        onShowFunc={() => {
                        }}
                    />
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}
