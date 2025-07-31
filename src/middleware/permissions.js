// src/middleware/permissions.js

export const permissions = {
  admin: ['create_hostel', 'delete_hostel', 'view_all_users'],
  warden: ['view_hostel', 'approve_student', 'edit_room'],
  student: ['view_room', 'apply_hostel'],
};

export const checkPermission = (action) => {
  return (req, res, next) => {
    const role = req.user.role;
    const allowed = permissions[role] || [];

    if (!allowed.includes(action)) {
      return res.status(403).json({ message: 'Permission Denied' });
    }

    next();
  };
};

