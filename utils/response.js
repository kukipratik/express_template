const ErrorCodes = require('./errorCodes');

module.exports = {
  sendSuccess: (res, { data = null, message = "Success", statusCode = 200 } = {}) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  sendError: (res, { message = "Something went wrong.", error_code = ErrorCodes.SERVER_ERROR, statusCode = 500, errors = null } = {}) => {
    const response = {
      success: false,
      message,
      error_code,
    };
    if (errors) response.errors = errors;
    res.status(statusCode).json(response);
  },
};
