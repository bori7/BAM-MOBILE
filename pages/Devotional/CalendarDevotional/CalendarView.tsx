import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../../components/Themed";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS, SIZES } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { JsonCalendar } from "json-calendar";

const CalendarView = () => {
  const [weeks, setWeeks] = useState<number[][]>([]);
  const [monthNames, setMonthNames] = useState<string[]>([]);
  const [year, setYear] = useState<number>(2023);

  const getWeeksForMonth = useCallback(
    (year: number, monthIdx: number) => {
      const calendar = new JsonCalendar({ today: new Date(year, monthIdx, 1) });
      return calendar.weeks;
    },
    [year]
  );

  const checkToday = (year: number, monthIdx: number, day: number) => {
    return (
      new Date().toDateString() ===
      new Date(`${year}-${monthIdx + 1}-${day}`).toDateString()
    );
  };

  useEffect(() => {
    // const calendar = new JsonCalendar({ today: new Date() });
    const calendar = new JsonCalendar({ year: year });
    // console.log(calendar.monthNames);
    // console.log(calendar);

    setMonthNames(calendar.monthNames);
  }, []);

  return (
    <View style={styles.year}>
      {monthNames.map((mon, monthIdx) => (
        <View style={styles.month} key={monthIdx}>
          <Text style={styles.fv3}>{mon}</Text>
          {getWeeksForMonth(year, monthIdx).map((wk, weekIdx) => (
            <View style={styles.wk} key={weekIdx}>
              {wk.map((day, dayIdx) => (
                <View
                  style={[
                    styles.day,
                    {
                      backgroundColor: checkToday(year, monthIdx, day.day)
                        ? COLORS.Light.colorOne
                        : "transparent",
                    },
                  ]}
                  key={dayIdx}
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
                      </TouchableOpacity>
                    </>
                  )}
                </View>
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
