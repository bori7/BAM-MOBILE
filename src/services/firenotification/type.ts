export interface RegisterDeviceTokenRequestType {
  deviceType: string;
  userId: string;
  deviceToken: string;
}

export interface RegisterDeviceTokenPayloadType {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  deviceToken: string;
  deviceType: string;
}

export interface SendNotificationRequestType {
  userId: string;
  title: string;
  body: string;
}

export interface SendNotificationPayloadType {}
