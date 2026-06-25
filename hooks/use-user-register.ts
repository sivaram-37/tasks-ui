import { useMutation } from "@tanstack/react-query";
import { userRegister } from "@/services/user";
import { userRegisterBody, UserResponse } from "@/types/user";
import { setUserToLocalStorage } from "@/lib/utils";

export const useUserRegister = () => {
  return useMutation({
    mutationFn: (data: userRegisterBody) => userRegister(data),
    onSuccess: (data: UserResponse) => {
      setUserToLocalStorage(data);
    },
  });
};
