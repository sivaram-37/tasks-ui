export const apiInfo = {
  staleTime: 10 * 60 * 1000, // 10 minutes
};

export const tasksUrl = "/tasks";
export const taskByIdUrl = (id) => `/tasks/${id}`;

export const userLoginUrl = "/user/login";
export const userRegisterUrl = "/user/register";
