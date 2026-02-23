export type UserTypeSingUp = {
  name: string;
  email: string;
  password: string;
};
export type UserTypeSingIn = {
  email: string;
  password: string;
};
export type TokenTypePayload = {
  id: number;
};
