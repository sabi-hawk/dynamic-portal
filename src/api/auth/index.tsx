import API from "../index";

type loginPayload = {
  email: string;
  password: string;
};
type SignupPayload = {
  username: string;
  email: string;
  password: string;
};
export const login = (loginData: loginPayload) =>
  API.post("/auth/login", loginData);

export const register = (signUpData: SignupPayload) =>
  API.post("/auth/register", signUpData);
