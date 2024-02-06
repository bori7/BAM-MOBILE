export interface CreateDevotionalRequestType {
  title: string;
  text: string;
  date: string;
  time: string;
  image: string;
  bibleVerse: string;
  keyText: string;
  keyVerse: string;
  message: string;
  prayer: string;
  subMessages: SubMessageType[];
}

export interface SubMessageType {
  id: string;
  title: string;
  message: string;
}

export interface CreateDevotionalPayloadType {
  devotionalId: string;
}

export interface FetchDevotionalPayloadType {
  devotionals: DevotionalType[];
}

export interface DevotionalType {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  text: string;
  date: string;
  time: string;
  image: string;
  dateTime: string | null;
  bibleVerse: string;
  keyText: string;
  keyVerse: string;
  message: string;
  prayer: string;
  subMessageIds?: string[];
  subMessages?: SubMessageType[];
  deleted: boolean;
}
