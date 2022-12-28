class CatchAsyncError extends Error {
  constructor(message, code, error) {
    super(message)
    this.name = 'CatchAsyncError'
    this.code = code
    this.error = error
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = CatchAsyncError
