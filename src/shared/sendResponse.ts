import { Response } from 'express';

type IapiResponse<T> = {
  statusCode: number;
  success: boolean;
  data?: T | null;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  message?: string | null;
};

export const sendResponse = <T>(
  res: Response,
  datas: IapiResponse<T>
): void => {
  const responseData: IapiResponse<T> = {
    statusCode: datas.statusCode,
    success: datas.success,
    meta: datas.meta || null,
    data: datas.data || null,
    message: datas.message || null,
  };

  res.status(datas.statusCode).json(responseData);
};
