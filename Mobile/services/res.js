const successResponse = (data) => ({
    success: true,
    response: data,
    error: null,
  });
  const errorResponse = (errorMessage) => ({
    success: false,
    response: null,
    error: errorMessage,
  });
  module.exports = {
    successResponse,
    errorResponse,
  };