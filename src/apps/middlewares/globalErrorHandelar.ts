import { IGenericErrorMassage } from './../../interfaces/GlobalError'
import { ErrorRequestHandler } from 'express'
import { handleValidationError } from '../../errors/handelValidationError'
import config from '../../config'
import { ApiError } from '../../errors/ApiError'

export const globalErrorHandeler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500
  let message = 'somting went wront !'
  let errorMessages: IGenericErrorMassage[] = []

  if (error?.name === 'ValidatorError') {
    const simpliFieldError = handleValidationError(error)
    statusCode = simpliFieldError.statusCode
    message = simpliFieldError.message
    errorMessages = simpliFieldError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.evn !== 'production' ? error?.stack : undefined,
  })

  next()
}
