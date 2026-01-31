import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Recipe, Ingredient, Media } from '../models/index.js';
import { httpStatusCodes } from '../errors/http.errors.js';

/* =========================
   PATH (ESM SAFE)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMG_DIR = path.join(__dirname, '..', 'public', 'img');

export const recipeController = {

  /* =========================
     GET ALL (PUBLIC)
  ========================= */
  async getAll(req, res, next) {
    try {
      const recipes = await Recipe.findAll({
        where: { is_validated: true },
        order: [['created_at', 'DESC']],
      });

      return res.status(httpStatusCodes.OK).json(recipes);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     GET ONE (PUBLIC)
  ========================= */
  async getOne(req, res, next) {
    try {
      const recipe = await Recipe.findByPk(req.params.id, {
        include: [
          {
            model: Ingredient,
            as: 'ingredients',
            attributes: ['id', 'name'],
            through: { attributes: ['quantity', 'unit'] },
          },
          {
            model: Media,
            as: 'seen_in_medias',
            attributes: ['id', 'title', 'img_url', 'category'],
            through: { attributes: [] },
          },
        ],
      });

      if (!recipe) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Recette introuvable' });
      }

      return res.status(httpStatusCodes.OK).json(recipe);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     GET PENDING (ADMIN)
  ========================= */
  async getPending(req, res, next) {
    try {
      const recipes = await Recipe.findAll({
        where: { is_validated: false },
        attributes: [
          'id',
          'title',
          'category',
          'created_at',
          'validated_by',
        ],
        order: [['created_at', 'DESC']],
      });

      return res.status(httpStatusCodes.OK).json(recipes);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     VALIDATE (ADMIN)
  ========================= */
  async validate(req, res, next) {
    try {
      const recipe = await Recipe.findByPk(req.params.id);

      if (!recipe) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Recette introuvable' });
      }

      recipe.is_validated = true;
      recipe.validated_by = req.user.id;
      await recipe.save();

      return res.status(httpStatusCodes.OK).json(recipe);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     CREATE (AUTH)
  ========================= */
  async create(req, res, next) {
    try {
      const {
        title,
        instructions,
        category,
        time,
        difficulty,
        ingredients,
        medias_ids,
      } = req.body;

      if (!title || !instructions) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Titre et instructions requis' });
      }

      let filename = null;

      if (req.file) {
        const safeFilename = Buffer
          .from(req.file.originalname, 'latin1')
          .toString('utf8');

        const filePath = path.join(IMG_DIR, safeFilename);
        fs.writeFileSync(filePath, req.file.buffer);

        filename = safeFilename;
      }

      const recipe = await Recipe.create({
        title,
        instructions,
        category,
        time: time ? Number(time) : null,
        difficulty: difficulty ? Number(difficulty) : null,
        img_url: filename,
        is_validated: req.user.role === 'admin',
        validated_by: req.user.id,
      });

      /* INGREDIENTS */
      if (ingredients) {
        const parsed =
          typeof ingredients === 'string'
            ? JSON.parse(ingredients)
            : ingredients;

        await recipe.setIngredients([]);

        for (const row of parsed) {
          await recipe.addIngredient(Number(row.ingredient_id), {
            through: {
              quantity: Number(row.quantity ?? 0),
              unit: String(row.unit ?? ''),
            },
          });
        }
      }

      /* MEDIAS */
      if (medias_ids) {
        const ids =
          typeof medias_ids === 'string'
            ? JSON.parse(medias_ids).map(Number)
            : medias_ids.map(Number);

        await recipe.setSeen_in_medias(ids);
      }

      return res.status(httpStatusCodes.CREATED).json(recipe);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     UPDATE (AUTH)
  ========================= */
  async update(req, res, next) {
    try {
      const recipe = await Recipe.findByPk(req.params.id);

      if (!recipe) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Recette introuvable' });
      }

      const {
        title,
        instructions,
        category,
        time,
        difficulty,
        ingredients,
        medias_ids,
      } = req.body;

      if (title !== undefined) recipe.title = title;
      if (instructions !== undefined) recipe.instructions = instructions;
      if (category !== undefined) recipe.category = category;
      if (time !== undefined) recipe.time = time ? Number(time) : null;
      if (difficulty !== undefined)
        recipe.difficulty = difficulty ? Number(difficulty) : null;

      if (req.file) {
        const safeFilename = Buffer
          .from(req.file.originalname, 'latin1')
          .toString('utf8');

        const filePath = path.join(IMG_DIR, safeFilename);
        fs.writeFileSync(filePath, req.file.buffer);

        recipe.img_url = safeFilename;
      }

      await recipe.save();

      /* INGREDIENTS */
      if (ingredients !== undefined) {
        const parsed =
          typeof ingredients === 'string'
            ? JSON.parse(ingredients)
            : ingredients;

        await recipe.setIngredients([]);

        for (const row of parsed) {
          await recipe.addIngredient(Number(row.ingredient_id), {
            through: {
              quantity: Number(row.quantity ?? 0),
              unit: String(row.unit ?? ''),
            },
          });
        }
      }

      /* MEDIAS */
      if (medias_ids !== undefined) {
        const ids =
          typeof medias_ids === 'string'
            ? JSON.parse(medias_ids).map(Number)
            : medias_ids.map(Number);

        await recipe.setSeen_in_medias(ids);
      }

      return res.sendStatus(httpStatusCodes.OK);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     DELETE (AUTH)
  ========================= */
  async delete(req, res, next) {
    try {
      const recipe = await Recipe.findByPk(req.params.id);

      if (!recipe) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Recette introuvable' });
      }

      await recipe.destroy();
      return res.sendStatus(httpStatusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },
};
