export interface CreateVODRequestType {
  verse: string;
  text: string;
  date: string;

  id?: string;
  createdAt?: string;
  updatedAt?: string;

  deleted?: boolean;
}

export interface CreateVODPayloadType {
  vodId: string;
}
