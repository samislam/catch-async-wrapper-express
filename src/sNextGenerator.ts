import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import CatchAsyncError from './CatchAsyncError.js'
import { isAsyncFunction, isUndefined } from '@samislam/checktypes'

export const sNextGenerator =
  (
    errorHandler: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) =>
  async (error?: unknown) => {
    if (isUndefined(error)) return next()
    try {
      isAsyncFunction(errorHandler)
        ? await errorHandler(error, req, res, next)
        : errorHandler(error, req, res, next)
    } catch (localErrorHandlerError) {
      next(
        new CatchAsyncError(
          'local error handler error!',
          'localErrorHandlerError',
          {
            localErrorHandlerError,
            error,
          }
        )
      )
    }
  }

export default sNextGenerator
