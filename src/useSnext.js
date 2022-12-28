const CatchAsyncError = require('./CatchAsyncError.js')
const { isAsyncFunction, isUndefined } = require('@samislam/checktypes')

const useSnext = (errorHandler, req, res, next) => async (error) => {
  if (isUndefined(error)) return next()
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
module.exports = useSnext
