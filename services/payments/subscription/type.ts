export interface SubscriptionPayloadType {
    subscriptionType: "ANNUALLY" | "QUARTERLY" | "ANUALLY";
    dateOfNextSubscription: string;
    subscriptionStatus: "ACTIVE" | string;
    currency: "NGN" | string;
    amountPaid: string;
    paymentMethod: string;
    dateOfSubscription: string
}

export interface SubscriptionFetchRequestType {
    userId?: string
}