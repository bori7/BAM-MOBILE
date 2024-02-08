export interface CreateNoteRequestType {
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

  datetime?: string | null;
}

export interface CreateNotePayloadType {
  noteId: string;
}

export interface FetchNoteByIdType {
  noteId?: string
}
