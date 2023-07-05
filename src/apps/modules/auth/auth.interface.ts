export type IloginUser = {
  id: string;
  password: string;
};
export type ILoginUserResponse = {
  AccessToken?: string;
  RefreshToken?: string;
  needPasswordChange?: boolean;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IRefreshToken = {
  AccessToken: string;
};
