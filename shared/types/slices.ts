export interface InitialUserStateType {
  userData: UserDataType | null;
  userLoading: boolean;
  userError: InitialUserErrorType | null;
  userMessage: string;
}

export interface InitialUserErrorType {
  message?: string;
  code?: string;
}

export interface UserDataType {
  id?: string;
  email_address?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  total_balance?: string;
  total_returns?: string;
  token?: string;
  created_at?: string;
  phone_number?: string;
  date_of_birth?: string;
  password?: string;
  isRiseUserKey?: string;
}

export interface InitialScreenNotificationStateType {
  notificationData: NotificationDataType | null;
  notificationLoading: boolean;
  notificationError: InitialUserErrorType | null;
  notificationMessage: string;
  notificationFunction: () => void;

  screenData: ScreenDataType | null;
  screenLoading: boolean;
  screenError: InitialUserErrorType | null;
  screenMessage: string;
  screenFunction: () => void;
}

export interface NotificationDataType {
  duration: number;
}

export interface ScreenDataType {
  duration: number;
}

export interface InitialNotesStateType {
  notesData: NotesDataType | null;
  notesLoading: boolean;
  notesError: InitialUserErrorType | null;
  notesMessage: string;
}

export interface NotesDataType {
  notesList: NoteProps[];
}

export interface NoteProps {
  uid: string;
  title: string;
  text: string;
  datetime: string;
  date: string;
  time: string;
}
