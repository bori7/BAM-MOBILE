import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export enum NotesRoutes {
  NotesMain = "NotesMain",
  NotesCreate = "NotesCreate",
  NotesEdit = "NotesEdit",
  NotesSearch = "NotesSearch",
}

export type NotesParamList = {
  [NotesRoutes.NotesMain]: undefined;
  [NotesRoutes.NotesCreate]: undefined;
  [NotesRoutes.NotesEdit]: {
    // params: {
    noteId: string;
    // };
  };
  [NotesRoutes.NotesSearch]: undefined;
};

export type NotesProps<RouteName extends NotesRoutes> = StackScreenProps<
  NotesParamList,
  RouteName
>;

export type NotesNavigationProps = StackNavigationProp<NotesParamList>;
