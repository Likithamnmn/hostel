export const isAdminOrWarden = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'warden') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

