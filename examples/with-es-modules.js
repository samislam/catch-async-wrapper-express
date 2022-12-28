const express = require('express')
const catchAsync = require('catch-async-wrapper-express')
const app = express()

// if failed, next will be called with the error
app.get(
  '/users',
  catchAsync(async (req, res, next) => {
    const data = await UserModel.find({}) // ex: using mongoose
    res.status(200).json({
      status: 'success',
      data,
    })
  })
)

// if failed, localErrorHandler will be called with the error

const localErrorHandler = (error, req, res, next) => {
  console.log(error)
  res.status(500).json({
    status: 'fail',
    message: 'Unable to create user, please try again',
  })
}

app.post(
  '/users',
  catchAsync(async (req, res, next) => {
    const data = await UserModel.create(req.body) // ex: using mongoose
    res.status(200).json({
      status: 'success',
      data,
    })
  }, localErrorHandler)
)
