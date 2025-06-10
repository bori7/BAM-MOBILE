export interface PlaceOrderRequestType {
    userId: string;
    shippingAddress: string;
    price: string;
    recipientPhoneNumber: string;
    ccy: string;
    paymentType: string;
    orderItems: OrderItemType[];
    subscriptionType: "ANNUALLY" | "QUARTERLY" | "MONTHLY" | string;
    reference: string;
    email: string;
    title: string;
}

export interface OrderItemType {
    productId: string;
    quantity: string;
    price: string;
    id?: string;
}

export interface PlaceOrderPayloadType {
    orderId: string;
    clientSecret: string;
    checkOutUrl: string;
    paymentIntentId: string;
    message: string;
}

export interface CreateCheckOutSessionPayloadType {
    orderId: string;
    clientSecret: string;
    checkoutSessionUrl: string;
    paymentIntentId: string;
    sessionId: string;
    message: string;
}

export interface GetUserOrdersRequestType {
    userId: string;
}

export interface GetUserOrdersPayloadType {
    orders: OrderType[];
}

export interface OrderType {
    id: string;
    userId: string;
    status: string;
    ccy: string;
    price: string;
    paymentIntentId: string;
    deliveryTrackingId: string;
    orderStatusChangeTime: string;
    orderRating: string;
    shippingAddress: string;
    recipientPhoneNumber: string;
    paymentType: string;
    orderDate: string;
    orderTime: string;
    orderItem: OrderItemType[];
}

export interface GetOrderRequestType {
    orderId: string;
}

export interface GetOrderPayloadType {
    order: OrderType;
}

export interface UpdateOrderStatusRequestType {
    orderId: string;
    prevStatus: string;
}

export interface UpdateOrderPayloadType {
    updatedOrder: OrderType;
}
