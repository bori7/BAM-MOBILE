import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Text, View } from "../../../components/Themed";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { NotesProps, NotesRoutes } from "../../../shared/const/routerNotes";
import { COLORS, SIZES } from "../../../constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { RootScreenProps, RootRoutes } from "../../../shared/const/routerRoot";
import { NoteProps } from "../../../shared/types/slices";
import { notesActions } from "../../../store/slices/notes";

// type NavigationProps = NotesProps<NotesRoutes.NotesMain>;

type NavigationProps = CompositeScreenProps<
  NotesProps<NotesRoutes.NotesMain>,
  RootScreenProps<RootRoutes.Notes>
>;

const NotesMain: React.FC<NavigationProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [notes, setNotes] = useState<NoteProps[]>([]);

  const notesState = useSelector((state: RootState) => state.notes);
  const { notesData } = notesState;

  useFocusEffect(() => {
    // const navigationState = navigation.getState();
    // console.log(navigationState);
    setNotes(notesData?.notesList || []);
  });

  const screenNotificationState = useSelector(
    (state: RootState) => state.screenNotification
  );
  const { screenLoading } = screenNotificationState;

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.r1}>
            <TouchableOpacity style={styles.r1t1}>
              <Text style={styles.r1t2}>Notes</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.r2}
            onPress={() => {
              // navigation?.navigate(NotesRoutes.NotesSearch);
              navigation?.navigate(RootRoutes.Notes, {
                screen: NotesRoutes.NotesSearch,
                params: undefined,
              });
            }}
          >
            <TouchableOpacity style={styles.r2t1}>
              <Feather name="search" size={25} color={COLORS.Light.colorFour} />
            </TouchableOpacity>
            <Text style={styles.r2t2}>Search notes</Text>
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scroll}
          >
            {notes?.map((note, idx) => (
              <TouchableOpacity
                style={styles.r3}
                key={idx}
                onPress={() => {
                  // navigation?.navigate(NotesRoutes.NotesEdit);
                  navigation.navigate(RootRoutes.Notes, {
                    screen: NotesRoutes.NotesEdit,
                    params: {
                      noteId: note.uid,
                    },
                  });
                }}
              >
                <Text style={styles.r3t1}>{note?.title}</Text>
                <Text style={styles.r3t2}>{note?.text}</Text>
                {/* <Text style={styles.r3t3}>{note?.datetime}</Text> */}
                <Text style={styles.r3t3}>
                  {note?.time} {note?.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.floatingContent2}
          onPress={() => {
            // navigation?.navigate(NotesRoutes.NotesCreate);
            navigation.navigate(RootRoutes.Notes, {
              screen: NotesRoutes.NotesCreate,
              params: undefined,
            });
          }}
        >
          <Text style={styles.fc2t}>
            <AntDesign name="plus" size={50} color={COLORS.Light.background} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotesMain;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // borderWidth: 1,
  },
  container: {
    // borderWidth: 1,
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    marginHorizontal: "5%",
  },
  subContainer: {
    // flex: 1,
    // borderWidth: 1,
    // justifyContent: "center",
    alignItems: "center",
    // height: "60%",
    width: "100%",
    marginTop: "15%",
    // paddingHorizontal: "5%",
  },
  scroll: {
    // borderWidth: 1,
    width: "100%",
    marginTop: 30,
    backgroundColor: "transparent",
    marginBottom: 120,
    // height: "100%",
  },
  scrollContent: {
    // borderWidth: 1,
    width: "100%",

    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 20,
    paddingVertical: 5,
  },
  r1: {
    flexDirection: "row",
    // justifyContent: "center",
    width: "100%",
    alignItems: "center",
    marginBottom: "8%",
    backgroundColor: "transparent",
  },
  r1t1: {},
  r1t2: {
    marginLeft: "8%",
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEightB,
    fontWeight: "500",
    textAlign: "center",
  },
  r2: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    // borderWidth: 1,
    borderRadius: 40,
    backgroundColor: COLORS.Light.hashHomeBackGroundL2,
    alignItems: "center",
  },
  r2t1: {
    marginRight: "5%",
  },
  r2t2: {
    color: COLORS.Light.greyText,
    fontSize: SIZES.sizeSevenB,
    fontWeight: "400",
  },
  r3: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: COLORS.Light.hashBackGroundL2,
    marginBottom: 30,
  },
  r3t1: {
    color: COLORS.Light.colorFour,
    fontSize: SIZES.sizeEight,
    fontWeight: "500",
    marginVertical: 10,
  },
  r3t2: {
    color: COLORS.Light.gray,
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    marginVertical: 8,
  },
  r3t3: {
    color: COLORS.Light.deeperGreyColor,
    fontSize: SIZES.sizeSeven,
    fontWeight: "400",
    marginVertical: 8,
  },
  floatingContent2: {
    height: 65,
    width: 65,
    position: "absolute",
    top: "90%",
    backgroundColor: COLORS.Light.colorOne,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.Light.colorOneLightA,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10,
    // borderWidth: 1,
  },
  fc2t: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    // marginLeft: "8%",
  },
});
