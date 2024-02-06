export interface CreateUserDevotionalRequestType {
  userId: string;
  readIds: string[];
}

export interface CreateUserDevotionalPayloadType {
  userDevotionalId: string;
}

export interface FetchUserDevotionalPayloadType {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  readIds: string[];
}
