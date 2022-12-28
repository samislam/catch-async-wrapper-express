const { isAsyncFunction } = require('@samislam/checktypes')
const useSnext = require('./useSnext.js')

module.exports = function catchAsync(middleware, errorHandler) {
  return (req, res, next) => {
    const sNext = useSnext(errorHandler, req, res, next)
    const consumersNext = errorHandler ? sNext : next
    return Promise.resolve(middleware(req, res, consumersNext)).catch(
      async (error) => (!errorHandler ? next(error) : await sNext(error))
    )
  }
}
