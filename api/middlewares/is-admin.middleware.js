import { HttpForbiddenError } from '../errors/http.errors.js';

export function isAdmin(req, res, next) {
  // ✅ LE BON ENDROIT
  const userRole = req.user?.role;

  if (userRole === 'admin') {
    return next();
  }

  throw new HttpForbiddenError('You must be admin to access this route');
}
