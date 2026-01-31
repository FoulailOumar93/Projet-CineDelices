// api/routers/media.router.js
import { Router } from 'express';
import { mediaController } from '../controllers/media.controller.js';
import { isAuthed } from '../middlewares/is-authed.middleware.js';
import { upload } from '../middlewares/file-upload.middleware.js';

const router = Router();

/* =========================
   PUBLIC
========================= */
router.get('/', mediaController.getAll);

/* =========================
   ADMIN
========================= */
// ⚠️ Les routes spécifiques AVANT /:id
router.get('/admin/pending', isAuthed, mediaController.getPending);
router.patch('/admin/:id/validate', isAuthed, mediaController.validate);

/* =========================
   PUBLIC (ONE)
========================= */
router.get('/:id', mediaController.getOne);

/* =========================
   AUTH (MEMBER / ADMIN)
========================= */
router.post(
  '/',
  isAuthed,
  upload.single('image'),
  mediaController.create,
);

router.patch(
  '/:id',
  isAuthed,
  upload.single('image'),
  mediaController.update,
);

router.delete(
  '/:id',
  isAuthed,
  mediaController.delete,
);

export default router;