import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

/* =========================
   ROUTERS
========================= */
import recipeRouter from './routers/recipe.router.js';
import userRouter from './routers/user.router.js';
import mediaRouter from './routers/media.router.js';
import ingredientRouter from './routers/ingredient.router.js';
import searchRouter from './routers/search.router.js';

/* =========================
   APP
========================= */
const app = express();

/* =========================
   PATH FIX (ESM)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC IMAGES
   Dossier réel : api/public/img
   URL publique : /img/xxx.jpg
========================= */
app.use(
  '/img',
  express.static(path.join(__dirname, 'public', 'img')),
);

/* =========================
   ROUTES API
========================= */
app.use('/recipes', recipeRouter);
app.use('/users', userRouter);
app.use('/medias', mediaRouter);
app.use('/ingredients', ingredientRouter);
app.use('/search', searchRouter);

/* =========================
   404 API
========================= */
app.use((req, res) => {
  res.status(404).json({
    error: 'Route API introuvable',
    path: req.originalUrl,
  });
});

/* =========================
   SERVER
========================= */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API démarrée sur http://localhost:${PORT}`);
  console.log(`🖼️ Images servies sur http://localhost:${PORT}/img`);
});
