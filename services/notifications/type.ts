export interface CreateNotificationsRequestType {
  id?: string;
  userId: string;

  createdAt?: string;
  updatedAt?: string;

  dateTime: string | null;
  notifications: NotificationType[];
}

export interface NotificationType {
  notificationType:
    | "prayerReminder"
    | "verseOfTheDay"
    | "dailyAnswerDevotional";
  email?: {
    enabled: boolean;
    timeValue: string;
  };
  push: {
    enabled: boolean;
    timeValue: string;
  };
}

export interface CreateNotificationsPayloadType {
  notificationId: string;
}

export interface FetchNotificationByIdType {
  notificationId?: string;
}
