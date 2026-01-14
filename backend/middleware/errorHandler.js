const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || constants.SERVER_ERROR;

  res.status(statusCode).json({
    title:
      statusCode === constants.VALIDATION_ERROR
        ? "Validation Error"
        : statusCode === constants.UNAUTHORIZED
        ? "Unauthorized"
        : statusCode === constants.NOT_FOUND
        ? "Not Found"
        : "Server Error",
    message: err.message,
    stackTrace:
      process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
