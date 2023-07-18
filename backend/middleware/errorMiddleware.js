const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = changeStatusToErrorCodeIfItIs200(res.statusCode);
  let message = err.message;

  if (userDoesNotHaveAnObjectID(err)) {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const changeStatusToErrorCodeIfItIs200 = (code) => {
  return code === 200 ? 500 : code;
};

const userDoesNotHaveAnObjectID = (err) => {
  return err.name === "CastError" && err.kind === "ObjectId";
};

export { notFound, errorHandler };
