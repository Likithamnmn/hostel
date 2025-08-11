export const handleError = (res, err, status = 500) => {
  res.status(status).json({ message: err.message || 'Server Error' });
};
