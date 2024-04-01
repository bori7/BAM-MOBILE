export interface InitiatePaystackRequestType {
    email: string;
    amount: string;
    currency: "NGN" | "USD" | string;
    reference: string;
    userId: string;
    subscriptionType: "ANNUALLY" | "QUARTERLY" | "MONTHLY" | string;
}

export interface InitiatePaystackPayloadType {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
}

export interface VerifyPaystackRequestType {
    event?: string;
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: string;
        reference: string;
        receipt_number: string | null;
        amount: number;
        message: string;
        gateway_response: string;
        paid_at: string;
        created_at: string;
        channel: string;
        currency: string | "NGN";
        ip_address: string;
        metadata: string;
        log: {
            start_time: number;
            time_spent: string;
            attempts: number;
            authentication: string;
            errors: number;
            success: boolean;
            mobile: boolean;
            input: [];
            history: [
                {
                    type: string;
                    message: string;
                    time: number;
                },
                {
                    type: string;
                    message: string;
                    time: number;
                },
                {
                    type: string;
                    message: string;
                    time: number;
                },
                {
                    type: string;
                    message: string;
                    time: number;
                },
                {
                    type: string;
                    message: string;
                    time: number;
                }
            ];
        };
        fees: number;
        fees_split: null;
        authorization: {
            authorization_code: string;
            bin: string;
            last4: string;
            exp_month: string;
            exp_year: string;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
            account_name: string | null;
        };
        customer: {
            id: number;
            first_name: string | null;
            last_name: string | null;
            email: string;
            customer_code: string;
            phone: string | null;
            metadata: string | null;
            risk_action: string;
            international_format_phone: string | null;
        };
        plan: null;
        split: object;
        order_id: string | null;
        paidAt: string;
        createdAt: string;
        requested_amount: number;
        pos_transaction_data: string | null;
        source: string | null;
        fees_breakdown: string | null;
        transaction_date: string;
        plan_object: object | {};
        subaccount: object | {};
    };
}

export interface FetchGivingRequestType {
    reference?: string;
    userId?: string;
}