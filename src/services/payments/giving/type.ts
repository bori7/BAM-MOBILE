
export interface FetchGivingPayloadType {
    id: string;
    reference: string;
    amount: string;
    currency: "NGN" | string;
    userId: string;
    status: "DISABLE" | string;
    message: string;
    channel: string;
    fees: string;
    email: string;
    phone: string;
    paidAt: string;
    createdAt: string;
    access_code: string;
    createdDate: string;
}