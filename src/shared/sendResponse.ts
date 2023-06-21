import { Response } from 'express';

type IapiResponse<T> = {
  statusCode: number;
  success: boolean;
  data?: T | null;
  message?: string | null;
};

export const sendResponse = <T>(
  res: Response,
  datas: IapiResponse<T>
): void => {
  const responseData: IapiResponse<T> = {
    statusCode: datas.statusCode,
    success: datas.success,
    data: datas.data || null,
    message: datas.message || null,
  };

  res.status(datas.statusCode).json(responseData);
};
