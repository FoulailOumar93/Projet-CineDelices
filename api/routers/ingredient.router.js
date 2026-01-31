import { Router } from 'express';
import { ingredientController } from '../controllers/ingredient.controller.js';
import { isAuthed } from '../middlewares/is-authed.middleware.js';
import { isAdmin } from '../middlewares/is-admin.middleware.js';

const router = Router();

/* =========================
   PUBLIC
========================= */
router.get('/', ingredientController.getAll);
router.get('/:id', ingredientController.getOne);

/* =========================
   ADMIN
========================= */
router.get(
  '/admin/pending',
  isAuthed,
  isAdmin,
  ingredientController.getPending,
);

router.patch(
  '/admin/:id/validate',
  isAuthed,
  isAdmin,
  ingredientController.validate,
);

/* =========================
   AUTH
========================= */
router.post('/', isAuthed, ingredientController.create);
router.patch('/:id', isAuthed, ingredientController.update);
router.delete('/:id', isAuthed, ingredientController.delete);

export default router;
