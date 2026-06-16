function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-unused-vars
  const _ = next;

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      message
    }
  });
}

module.exports = { errorHandler };

