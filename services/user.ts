import { userLoginUrl, userRegisterUrl } from "@/lib/apiUrl";
import { api } from "@/lib/axios";
import { UserLoginBody, userRegisterBody } from "@/types/user";

export const userLogin = async (data: UserLoginBody) => {
  const res = await api.post(userLoginUrl, data);
  return res.data;
};

export const userRegister = async (data: userRegisterBody) => {
  const res = await api.post(userRegisterUrl, data);
  return res.data;
};
