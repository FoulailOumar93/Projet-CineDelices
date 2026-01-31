import { Router } from 'express';
import { recipeController } from '../controllers/recipe.controller.js';
import { isAuthed } from '../middlewares/is-authed.middleware.js';
import { isAdmin } from '../middlewares/is-admin.middleware.js';
import { upload } from '../middlewares/file-upload.middleware.js';

const router = Router();

/* =========================
   PUBLIC
========================= */

// Toutes les recettes validées
router.get(
  '/',
  recipeController.getAll,
);

// Détail d’une recette
router.get(
  '/:id',
  recipeController.getOne,
);

/* =========================
   ADMIN
========================= */

// Recettes en attente
router.get(
  '/admin/pending',
  isAuthed,
  isAdmin,
  recipeController.getPending,
);

// Valider une recette
router.patch(
  '/admin/:id/validate',
  isAuthed,
  isAdmin,
  recipeController.validate,
);

/* =========================
   AUTH (MEMBRE / ADMIN)
========================= */

// Créer une recette
router.post(
  '/',
  isAuthed,
  upload.single('image'),
  recipeController.create,
);

// Modifier une recette
router.patch(
  '/:id',
  isAuthed,
  upload.single('image'),
  recipeController.update,
);

// Supprimer une recette
router.delete(
  '/:id',
  isAuthed,
  recipeController.delete,
);

export default router;
