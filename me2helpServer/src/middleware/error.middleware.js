// ← global error handler
const errorMiddleware = (
  err,
  _req,
  res,
  _next
) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
};

module.exports = errorMiddleware;