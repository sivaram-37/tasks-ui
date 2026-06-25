import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/services/user";
import { UserLoginBody, UserResponse } from "@/types/user";
import { setUserToLocalStorage } from "@/lib/utils";

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (data: UserLoginBody) => userLogin(data),
    onSuccess: (data: UserResponse) => {
      setUserToLocalStorage(data);
    },
  });
};
