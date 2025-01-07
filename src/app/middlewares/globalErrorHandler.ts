/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'something went wrong !';
  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
