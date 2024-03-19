import {ImageSourcePropType} from "react-native";
import {NotificationsFormType} from "../../pages/More/EmailNotifications";
import {FetchUserDevotionalPayloadType} from "../../services/userdevotional/type";

export interface InitialUserStateType {
    userData: UserDataType | null;
    userImageBase64?: string;
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
    fullname?: string;
    bio?: string;
    location?: string;
    hasSubscribed?: boolean;
    token?: string;
    created_at?: string;
    phone_number?: string;
    date_of_birth?: string;
    password?: string;
    isBibleAppUserKey?: string;
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
    screenFunction?: () => void;
}

export interface NotificationDataType {
    duration: number;
    message: string;
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

export interface DevotionalItemProps {
    uid: string;
    image: { uri: string };
    date: string;
    title: string;
    text: string;
    ticked: boolean;
}

export interface InitialDevotionalStateType {
    devotionalData: DevotionalDataType;
    selectedDevotionalData: SelectedDevotionalDataType | null;
    devotionalLoading: boolean;
    devotionalError: InitialUserErrorType | null;
    devotionalMessage: string;
}

export interface DevotionalDataType {
    devotionalList: DevotionalItemProps[];
    userDevotional?: FetchUserDevotionalPayloadType | null
}

export interface SelectedDevotionalDataType {
    uid: string;
    image: ImageSourcePropType;
    date: string;
    title: string;
    ticked: boolean;
    bibleVerse: string;
    keyText: string;
    keyVerse: string;
    message: string;
    subMessages: SubTopicType[];
    prayer: string;
}

export interface SubTopicType {
    title: string;
    message: string;
}

export interface InitialMoreStateType {
    moreData: MoreDataType | null;
    activeSubscriptionData: ActiveSubscriptionDataType | null;
    moreLoading: boolean;
    moreError: InitialUserErrorType | null;
    moreMessage: string;
    givingTransactions: GivingTransactionDataType[];
    selectedGivingTransaction: GivingTransactionDataType | null;
}

export interface MoreDataType {
}

export interface ActiveSubscriptionDataType {
    subscriptionType: SubscriptionType;
    dateNextSubscription?: string;
    numberOfDaysLeft?: string | number;
    status: StatusType;
    amountPaid: string;
    paymentMethod: PaymentMethodType;
    dateOfSubscription?: Date;
}

export type SubscriptionType = "Annually" | "Quarterly" | "Monthly";
export type StatusType = "Active" | "Suspended" | "Pending";
export type PaymentMethodType = "Account" | "Card" | "Transfer";
export type GivingPaymentMethodType = "D" | "T" | "C" | "A";

export interface GivingTransactionDataType {
    uid?: string;
    currency: string;
    amount: string;
    status?: string;
    date?: string;
    time?: string;
    datetime?: string;
    paymentMethod: GivingPaymentMethodType;
    reference?: string;
}

export interface InitialPrayersStateType {
    prayersData: PrayersDataType | null;
    prayersLoading: boolean;
    prayersError: InitialUserErrorType | null;
    prayersMessage: string;
}

export interface PrayersDataType {
    prayersList: PrayerProps[];
}

export interface PrayerProps {
    uid: string;
    title: string;
    text: string;
    datetime: string;
    date: string;
    time: string;
    answered: boolean;
}

export interface InitialGeneralStateType {
    generalData: GeneralDataType | null;
    generalEmailNotificationForms: NotificationsFormSliceType;
    generalPushNotificationForms: NotificationsFormSliceType;
    generalVerseOfTheDayList: GeneralVerseOfTheDayType[];
    generalLoading: boolean;
    generalError: InitialUserErrorType | null;
    generalMessage: string;
}

export interface GeneralDataType {
}

export interface NotificationsFormSliceType {
    [key: string]: Pick<NotificationsFormType, "timeValue" | "enable">;
}

export interface GeneralVerseOfTheDayType {
    verse: string;
    text: string;
    date: string;
}
