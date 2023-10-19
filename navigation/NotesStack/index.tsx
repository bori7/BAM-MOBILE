import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NotesParamList, NotesRoutes } from "../../shared/const/routerNotes";
import {
  NotesCreate,
  NotesEdit,
  NotesMain,
  NotesSearch,
} from "../../pages/Notes";

const Notes = createStackNavigator<NotesParamList>();

const NotesStack = (): React.ReactElement => {
  return (
    <Notes.Navigator
      initialRouteName={NotesRoutes.NotesMain}
      screenOptions={{ headerShown: false }}
    >
      <Notes.Screen
        component={NotesMain}
        name={NotesRoutes.NotesMain}
        options={{ headerShown: false }}
      />
      <Notes.Screen
        component={NotesEdit}
        name={NotesRoutes.NotesEdit}
        options={{ headerShown: false }}
      />
      <Notes.Screen
        component={NotesSearch}
        name={NotesRoutes.NotesSearch}
        options={{ headerShown: false }}
      />
      <Notes.Screen
        component={NotesCreate}
        name={NotesRoutes.NotesCreate}
        options={{ headerShown: false }}
      />
    </Notes.Navigator>
  );
};

export default NotesStack;
