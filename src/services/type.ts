export interface GenericResponseType<T> {
  message: string;
  responseCode: string;
  payload: T;
}
export interface RoleType {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  roleName: string;
  description: string;
}
