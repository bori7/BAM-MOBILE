export interface CreateVODRequestType {
  verse: string;
  text: string;
  date: string;

  id?: string;
  createdAt?: string;
  updatedAt?: string;

  deleted?: boolean;
}

export interface CreatePropheticDeclarationRequestType {

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

export interface CreatePropheticDeclarationPayloadType {
  propheticDeclarationId: string;
}
