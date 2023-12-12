import type { ErrorCodes } from './types'

interface ErrorBody {
  localErrorHandlerError: any
  error: any
}

export class CatchAsyncError extends Error {
  name: string
  constructor(
    public message: string,
    public code: ErrorCodes,
    public error: ErrorBody
  ) {
    super(message)
    this.name = 'CatchAsyncError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export default CatchAsyncError
