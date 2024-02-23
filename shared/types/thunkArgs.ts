import {CreateNoteRequestType, FetchNoteByIdType} from "../../services/note/type";
import {StateSchema} from "../../store/config";
import {CallbackGetRequestType, CallbackPostRequestType} from "../../services/payments/callback/type";

export type InitBAMThunkApiConfig = { state: StateSchema };

export type InitCreateNoteThunkArg = {
    createNoteRequest: CreateNoteRequestType;
}

export type InitUpdateNoteThunkArg = {
    updateNoteRequest: CreateNoteRequestType;
}

export type InitFetchAllNoteThunkArg = {
    fetchAllNoteRequest: FetchNoteByIdType;
}

export type InitFetchNoteByIdThunkArg = {
    fetchNoteByIdRequest: FetchNoteByIdType;
}

export type InitDeleteNoteThunkArg = {
    deleteNoteByIdRequest: CreateNoteRequestType;
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
