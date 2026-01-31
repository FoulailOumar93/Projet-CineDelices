import { Router } from 'express';

import recipeRouter from './recipe.router.js';
import mediaRouter from './media.router.js';
import userRouter from './user.router.js';
import ingredientRouter from './ingredient.router.js';
import searchRouter from './search.router.js';

const router = Router();

router.use('/recipes', recipeRouter);
router.use('/medias', mediaRouter);
router.use('/users', userRouter);
router.use('/ingredients', ingredientRouter);
router.use('/search', searchRouter);

export default router;
