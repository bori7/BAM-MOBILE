import {VerifyPaystackRequestType} from "../paystack/type";


export interface CallbackPostRequestType extends VerifyPaystackRequestType {

}


export interface CallbackGetRequestType {
    trxref: string;
    reference: string
}

export interface CallbackGetResponsePayload {

    id: string;
    reference: string;
    amount: string;
    currency: string;
    userId: string;
    status: "PENDING" | string;
    message: string;
    channel: "bank" | string;
    fees: string;
    email: string;
    phone: string;
    paidAt: string;
    createdAt: string;
    access_code: string;
    createdDate: string;
}