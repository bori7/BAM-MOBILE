export interface CreateUserDevotionalRequestType {
  userId: string;
  readIds: string[];
}

export interface CreateUserDevotionalPayloadType {
  userDevotionalId: string;
}

export interface FetchUserDevotionalPayloadType {
  id: string;
  createdAt: string | number;
  updatedAt: string | number;
  userId: string;
  readIds: string[];
}

export interface FetchUserDevotionalByIdType {
  userDevotionalId?: string
  title?: string
}