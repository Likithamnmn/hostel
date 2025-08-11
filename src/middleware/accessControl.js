// middlewares/accessControl.js
const accessControl = (allowedRoles = [], allowedGenders = []) => {
  return (req, res, next) => {
    const user = req.user; // from isAuth

    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Role check
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied: role restriction' });
    }

    // Gender check
    if (allowedGenders.length && !allowedGenders.includes(user.gender)) {
      return res.status(403).json({ message: 'Access denied: gender restriction' });
    }

    next();
  };
};
export default accessControl;
