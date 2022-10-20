const {ValidationError} = require('sequelize');
const boom = require('@hapi/boom');
const e = require('cors');

function logErrors(err,req, res, next) {
  console.log('logErrors');
 console.error(err);
 next(err);
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });

}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output: { statusCode, payload } } = err;
    res.status(statusCode).json(payload);
  }
  next(err);
}

/* function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    const { errors } = err;
    const messages = errors.map((error) => error.message);
    res.status(400).json({
      message: messages,
    });
  }
  next(err);
} */
function ormErrorHandler(err, req, res, next) {
 if(err instanceof ValidationError) {
  res.status(409).json({
    statusCode: 409,
    message: err.name,
    errors:err.errors
  });
}
next(err);
}

module.exports = {logErrors, errorHandler, boomErrorHandler, ormErrorHandler};
