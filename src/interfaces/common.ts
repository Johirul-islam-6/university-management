import { IGenericErrorMassage } from './GlobalError'

export type IgenericErrorRespons = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMassage[]
}
