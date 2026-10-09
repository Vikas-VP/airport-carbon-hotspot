function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
    errors: ['Endpoint does not exist']
  });
}

module.exports = notFoundHandler;

