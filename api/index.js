import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

/* =========================
   DATABASE
========================= */
import { sequelize } from './models/index.js';

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
   PORT
========================= */
const PORT = process.env.PORT || 3000;

/* =========================
   CORS
========================= */
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

/* =========================
   BODY PARSER
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC IMAGES
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
   ROUTE TEST
========================= */
app.get('/', (req, res) => {
  res.json({
    message: '🎬 API CinéDélices en ligne',
  });
});

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
   DATABASE + SERVER
========================= */
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ Base de données synchronisée');

    app.listen(PORT, () => {
      console.log(`🚀 API démarrée sur le port ${PORT}`);
      console.log(`🖼️ Images servies sur /img`);
    });
  })
  .catch((error) => {
    console.error('❌ Erreur base de données :', error);
  });