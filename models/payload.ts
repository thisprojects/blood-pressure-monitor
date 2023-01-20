export interface IPayload {
  customPayload: object | null;
  formPayload: FormData | null;
  headers: {
    "auth-token"?: string;
    id?: string;
    "content-type"?: string;
  };
}
