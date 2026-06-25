export interface UserLoginBody {
  email: string;
  password: string;
}

export interface userRegisterBody extends UserLoginBody {
  firstname: string;
  lastname: string;
}

export interface UserResponse {
  token: string;
  fullname: string;
  email: string;
}
