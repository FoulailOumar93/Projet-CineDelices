import jwt from 'jsonwebtoken';

export function isAuthed(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Token manquant ou invalide',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔐 On s'assure qu'il y a bien un id
    if (!decoded?.id) {
      return res.status(401).json({ message: 'Token invalide' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Non autorisé',
    });
  }
}
