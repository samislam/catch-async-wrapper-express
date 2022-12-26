import CatchAsyncError from './CatchAsyncError.js'
import { isAsyncFunction } from '@samislam/checktypes'

const useSnext = (errorHandler, req, res, next) => async (error) => {
  try {
    isAsyncFunction(errorHandler)
      ? await errorHandler(error, req, res, next)
      : errorHandler(error, req, res, next)
  } catch (localErrorHandlerError) {
    next(
      new CatchAsyncError('local error handler error!', 1, {
        localErrorHandlerError,
        error,
      })
    )
  }
}
export default useSnext
