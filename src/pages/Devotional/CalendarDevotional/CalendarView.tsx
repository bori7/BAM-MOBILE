import {Dimensions, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {Text, View} from "@components/Themed";
import React, {useCallback, useEffect, useState} from "react";
import {COLORS, SIZES} from "@constants/Colors";
import {Feather} from "@expo/vector-icons";
import {JsonCalendar} from "json-calendar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@store/index";
import {diffBetweenTwoDates} from "@shared/helper";
import {fetchDevotionalByIdCall} from "@store/apiThunks/devotional";
import {RootRoutes} from "@shared/const/routerRoot";
import {DevotionalNavigationProps, DevotionalRoutes} from "@shared/const/routerDevotional";
import {screenNotificationActions} from "@store/slices/notification";
import {useNavigation} from "@react-navigation/native";

const screenHeight = Dimensions.get('window').height;

interface ICalendarView {
    scrollRef: React.RefObject<ScrollView>
}

const CalendarView = ({scrollRef}: ICalendarView) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<DevotionalNavigationProps>();

    const [weeks, setWeeks] = useState<number[][]>([]);
    const [monthNames, setMonthNames] = useState<string[]>([]);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const devotionalState = useSelector((state: RootState) => state.devotional);
    const {devotionalData: {devotionalList, userDevotional}} = devotionalState;

    const [targetY, setTargetY] = useState(0);

    const scrollToTarget = () => {
        scrollRef.current?.scrollTo({
            y: targetY,
            animated: true,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToTarget();
        }, 1000);

        return () => clearTimeout(timer);
    }, [targetY]);

    const getWeeksForMonth = useCallback(
        (year: number, monthIdx: number) => {
            const calendar = new JsonCalendar({today: new Date(year, monthIdx, 1)});

            // debug.log("devotionalList", devotionalList);
            // debug.log("calendar.weeks", calendar.weeks);

            const monthDevotionals = devotionalList.filter((dev, monIdx_) => {
                    // debug.log("new Date(dev.datetime).getMonth()", new Date(dev.date).getMonth());
                    // debug.log("monthIdx", monthIdx);
                    // debug.log("new Date(dev.datetime).getFullYear()", new Date(dev.date).getFullYear());
                    // debug.log("year", year);

                    const devoMonth = new Date(dev.date).getMonth();
                    const devoYear = new Date(dev.date).getFullYear();

                    const monthCheck = devoMonth == monthIdx;
                    const yearCheck = devoYear == year;

                    // debug.log("monthCheck", monthCheck);
                    // debug.log("yearCheck", yearCheck);

                    return monthCheck && yearCheck;
                }
            );

            if (monthDevotionals.length > 0) {
                // debug.log("monthDevotionals", monthDevotionals);
            }

            const newMonthWks = calendar.weeks.map((week, weekIdx_) => {
                const lenOfWeek = week.length;
                const fro = week[0].date.toISOString();
                const to = week[lenOfWeek - 1].date.toISOString();

                const weekDevotionals = monthDevotionals?.filter((dev, wdIdx_) => {
                    const leftDiff = diffBetweenTwoDates(fro, dev.date);
                    const rightDiff = diffBetweenTwoDates(dev.date, to);
                    return (leftDiff >= 0 && rightDiff >= 0)
                })

                if (weekDevotionals.length > 0) {
                    // debug.log("weekDevotionals", weekDevotionals)
                }

                const newWeek = week.map((day, dayIdx_) => {
                    // debug.log("day.day", day);
                    const dayDevotional = weekDevotionals?.filter((dayDev, _) => {
                        // debug.log("new Date(dayDev.date).getDay()", new Date(dayDev.date).getDay());
                        // debug.log("day.day", day.date.getDay());
                        return (new Date(dayDev.date).getDay() === day.date.getDay())
                    })
                    let devoFix = null;
                    if (dayDevotional.length > 0) {
                        // debug.log("dayDevotional", dayDevotional)
                        devoFix = dayDevotional[0]
                    }

                    return {
                        day: day,
                        devo: devoFix
                    }

                })
                // debug.log("newWeek", newWeek)
                return newWeek
            })

            // debug.log("newMonthWks", newMonthWks)

            // return calendar.weeks;
            return newMonthWks;
        },
        [year, devotionalList]
    );

    const checkToday = (year: number, monthIdx: number, day: number) => {
        return (
            new Date().toDateString() ===
            new Date(`${year}-${monthIdx + 1}-${day}`).toDateString()
        );
    };

    useEffect(() => {
        // const calendar = new JsonCalendar({ today: new Date() });
        const calendar = new JsonCalendar({year: year});
        // console.log(calendar.monthNames);
        // console.log(calendar);

        setMonthNames(calendar.monthNames);
    }, []);

    return (
        <View style={styles.year}>
            {monthNames.map((mon, monthIdx) => (
                <View
                    style={styles.month} key={monthIdx}
                    onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        // debug.log("here now for:", layout)
                        // debug.log("here now for:", monthIdx)
                        if (monthIdx === new Date().getMonth()) {
                            // debug.log("here now for:", new Date())
                            // debug.log("here now for:", monthIdx)
                            setTargetY(layout.y);
                        }
                    }}
                >
                    <Text style={styles.fv3}>{mon}</Text>
                    {getWeeksForMonth(year, monthIdx).map((wk, weekIdx) => (
                        <View style={styles.wk} key={weekIdx}>
                            {wk.map(({day, devo}, dayIdx) => (
                                <TouchableOpacity
                                    style={[
                                        styles.day,
                                        {
                                            backgroundColor: checkToday(year, monthIdx, day.day)
                                                ? COLORS.Light.colorOne
                                                : "transparent",
                                        },
                                        devo && {
                                            borderColor: COLORS.Light.colorThirteen,
                                            borderLeftWidth: 2,
                                            borderBottomWidth: 2,
                                            borderRightWidth: 2,
                                            borderTopWidth: 2,
                                        }
                                    ]}
                                    key={dayIdx}

                                    onPress={async () => {
                                        if (!devo) {
                                            return
                                        }
                                        dispatch(screenNotificationActions.updateScreenLoading(true));
                                        await dispatch(fetchDevotionalByIdCall(
                                            {
                                                fetchDevotionalByIdRequest: {
                                                    devotionalId: devo?.uid || ""
                                                }
                                            }
                                        )).unwrap().then(() => {
                                            // navigation?.navigate(RootRoutes.Devotional, {
                                            //     screen: DevotionalRoutes.ContentDevotional,
                                            //     params: undefined
                                            // });
                                            navigation?.navigate(DevotionalRoutes.ContentDevotional);
                                        }).catch((err: unknown) => {
                                            debug.error("err while fetchingByDevoId in calendar view", err)
                                        }).finally(() => {
                                            dispatch(screenNotificationActions.updateScreenLoading(false));
                                        })
                                        dispatch(screenNotificationActions.updateScreenLoading(false));
                                    }}
                                >
                                    {day.monthIndex == monthIdx && (
                                        <>
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    {
                                                        color: checkToday(year, monthIdx, day.day)
                                                            ? COLORS.Light.background
                                                            : COLORS.Light.colorFour,
                                                    },
                                                ]}
                                            >
                                                {day.day}
                                            </Text>
                                            {(devo && userDevotional?.readIds.includes(devo.uid)) &&
                                                <TouchableOpacity style={styles.check}>
                                                    <Feather
                                                        name="check"
                                                        size={16}
                                                        color={
                                                            checkToday(year, monthIdx, day.day)
                                                                ? COLORS.Light.background
                                                                : COLORS.Light.colorOne
                                                        }
                                                    />
                                                </TouchableOpacity>}
                                        </>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default CalendarView;

const styles = StyleSheet.create({
    year: {
        width: "100%",
        // marginVertical: 5,
    },
    month: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: COLORS.Light.colorTwentySix,
        marginVertical: 10,
    },
    wk: {
        flexDirection: "row",
        width: "100%",
        borderLeftWidth: 1,
        borderColor: COLORS.Light.colorTwentySix,
        justifyContent: "space-between",
    },
    day: {
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderTopWidth: 1,
        width: `${Number(100 / 7).toFixed(5)}%`,
        height: 55,
        borderColor: COLORS.Light.colorTwentySixReal,
        padding: 1,
    },
    check: {
        position: "absolute",
        top: 1,
        right: 1,
    },
    dayText: {
        fontSize: SIZES.sizeSix,
    },
    fv3: {
        marginVertical: 10,
        alignSelf: "flex-start",
        fontWeight: "400",
        fontSize: SIZES.sizeSixC,
        color: COLORS.Light.deepGreyColor,
    },
});
