export interface CreatePrayerRequestType {
  userId: string;
  title: string;
  text: string;
  time: string;
  date: string;

  id?: string;
  createdAt?: string;
  updatedAt?: string;

  dateTime?: string | null;

  answered?: boolean;
  deleted?: boolean;
}

export interface CreatePrayerPayloadType {
  prayerId: string;
}
