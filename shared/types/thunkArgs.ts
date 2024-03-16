import {CreateNoteRequestType, FetchNoteByIdType} from "../../services/note/type";
import {StateSchema} from "../../store/config";
import {CallbackGetRequestType, CallbackPostRequestType} from "../../services/payments/callback/type";
import {InitiatePaystackRequestType} from "../../services/payments/paystack/type";
import {CreateNotificationsRequestType, FetchNotificationByIdType} from "../../services/notifications/type";
import {CreatePrayerRequestType, FetchPrayerByIdType} from "../../services/prayer/type";
import {
    CreateDevotionalPayloadType,
    CreateDevotionalRequestType, DevotionalType,
    FetchDevotionalByIdType
} from "../../services/devotional/type";
import {
    CreateUserDevotionalPayloadType,
    CreateUserDevotionalRequestType,
    FetchUserDevotionalByIdType
} from "../../services/userdevotional/type";
import {
    GoogleSignInRequestType,
    GoogleSignUpRequestType,
    SignInRequestType,
    SignUpRequestType
} from "../../services/user/type";
import {CreateVODRequestType} from "../../services/vod/type";

export type InitBAMThunkApiConfig = { state: StateSchema };

export type InitSignUpGoogleThunkArg = {
    signUpGoogleRequest: GoogleSignUpRequestType;
}

export type InitSignUpThunkArg = {
    signUpRequest: SignUpRequestType;
}

export type InitSignInGoogleThunkArg = {
    signInGoogleRequest: GoogleSignInRequestType;
}

export type InitSignInThunkArg = {
    signInRequest: SignInRequestType;
}

export type InitCreateNoteThunkArg = {
    createNoteRequest: CreateNoteRequestType;
}

export type InitCreateDevotionalThunkArg = {
    createDevotionalRequest: CreateDevotionalRequestType;
}

export type InitCreateVodThunkArg = {
    createVodRequest: CreateVODRequestType;
}

export type InitCreateUserDevotionalThunkArg = {
    createUserDevotionalRequest: CreateUserDevotionalRequestType;
}

export type InitCreatePrayerThunkArg = {
    createPrayerRequest: CreatePrayerRequestType;
}

export type InitCreateNotificationThunkArg = {
    createNotificationRequest: CreateNotificationsRequestType;
}

export type InitUpdateNoteThunkArg = {
    updateNoteRequest: CreateNoteRequestType;
}

export type InitUpdateDevotionalThunkArg = {
    updateDevotionalRequest: DevotionalType;
}

export type InitUpdateVODThunkArg = {
    updateVodRequest: CreateVODRequestType;
}

export type InitUpdateUserDevotionalThunkArg = {
    updateUserDevotionalRequest: CreateUserDevotionalRequestType;
}

export type InitUpdatePrayerThunkArg = {
    updatePrayerRequest: CreatePrayerRequestType;
}

export type InitUpdateNotificationThunkArg = {
    updateNotificationRequest: CreateNotificationsRequestType;
}

export type InitFetchAllNoteThunkArg = {
    fetchAllNoteRequest: FetchNoteByIdType;
}

export type InitFetchAllDevotionalThunkArg = {
    fetchAllDevotionalRequest: FetchNoteByIdType | null;
}

export type InitFetchAllVodThunkArg = {
    fetchAllVodRequest: null;
}

export type InitFetchUserDevotionalThunkArg = {
    fetchUserDevotionalRequest: null;
}


export type InitFetchNoteByIdThunkArg = {
    fetchNoteByIdRequest: FetchNoteByIdType;
}

export type InitFetchDevotionalByIdThunkArg = {
    fetchDevotionalByIdRequest: FetchDevotionalByIdType;
}

export type InitFetchUserDevotionalByIdThunkArg = {
    fetchUserDevotionalByIdRequest: FetchUserDevotionalByIdType;
}


export type InitFetchPrayerByIdThunkArg = {
    fetchPrayerByIdRequest: FetchPrayerByIdType;
}


export type InitFetchNotificationByIdThunkArg = {
    fetchNotififcationByIdRequest: FetchNotificationByIdType;
}

export type InitDeleteNoteThunkArg = {
    deleteNoteByIdRequest: CreateNoteRequestType;
}

export type InitDeleteDevotionalThunkArg = {
    deleteDevotionalByIdRequest: DevotionalType;
}

export type InitDeleteVODThunkArg = {
    deleteVODdRequest: CreateVODRequestType;
}


export type InitDeleteUserDevotionalThunkArg = {
    deleteUserDevotionalByIdRequest: CreateUserDevotionalRequestType;
}

export type InitDeletePrayerThunkArg = {
    deletePrayerByIdRequest: CreatePrayerRequestType;
}

// ###################### ########################PAYMENT#################### ######################

export type InitPaystaclkPostThunkArg = {
    paystackPostRequest: CallbackPostRequestType;
}

export type InitPaystaclkGetThunkArg = {
    paystackGetRequest: CallbackGetRequestType;
}

export type InitFetchAllGivingThunkArg = {
    fetchAllGivingRequest: null;
}

export type InitFetchGivingThunkArg = {
    fetchGivingRequest: null;
}

export type InitInitiatePaymentThunkArg = {
    initiatePaymentPaystack: InitiatePaystackRequestType;
}

export type InitVerifyPaymentThunkArg = {
    verifyPaymentPaystack: null;
}

export type InitFetchLiveSubscriptionThunkArg = {
    fetchLiveSubscriptionRequest: null;
}
