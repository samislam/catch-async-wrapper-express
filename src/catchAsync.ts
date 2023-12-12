import sNextGenerator from './sNextGenerator.js'
import { ErrorRequestHandler, RequestHandler, NextFunction } from 'express'

export const catchAsync =
  (middleware: RequestHandler, errorHandler?: ErrorRequestHandler): RequestHandler =>
  (req, res, next) => {
    let consumersNext: NextFunction
    if (errorHandler) consumersNext = sNextGenerator(errorHandler, req, res, next)
    else consumersNext = next

    return Promise.resolve(middleware(req, res, consumersNext)).catch(async (error) =>
      !errorHandler ? next(error) : await consumersNext(error)
    )
  }

export default catchAsync
