export type IloginUser = {
  id: string;
  password: string;
};
export type ILoginUserResponse = {
  AccessToken: string;
  RefreshToken: string;
  needPasswordChange: boolean;
};
