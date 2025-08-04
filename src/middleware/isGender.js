export const isGender = (gender) => {
  return (req, res, next) => {
    if (req.user?.gender !== gender) {
      return res.status(403).json({ message: `Only ${gender}s allowed` });
    }
    next();
  };
};
