import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id, role, and gender to the request object
    req.user = { id: decoded.id, role: decoded.role, gender: decoded.gender };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid or has expired.' });
  }
};

// This function restricts access to a route to specific roles and contains the codes of the autorizeRoles file
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user should be populated by the checkAuth middleware
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }
    next();
  };
};

export { checkAuth, authorizeRoles };
