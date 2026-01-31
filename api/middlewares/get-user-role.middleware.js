import jwt from 'jsonwebtoken';

export const getUserRole = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // invité
  if (!authHeader) {
    req.userRole = null;
    req.userId = null;
    return next();
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userRole = decoded.role;
    req.userId = decoded.userId; // 🔥 LIGNE MANQUANTE
    next();

  } catch (err) {
    req.userRole = null;
    req.userId = null;
    next();
  }
};
