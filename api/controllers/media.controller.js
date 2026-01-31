// api/controllers/media.controller.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Media, Recipe } from '../models/index.js';
import { httpStatusCodes } from '../errors/http.errors.js';
/* =========================
   HELPERS
========================= */
function getExactImageName(title) {
  return `${title}.jpg`;
}

/* =========================
   PATH (ESM SAFE)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMG_DIR = path.join(__dirname, '..', 'public', 'img');

export const mediaController = {

  /* =========================
     GET ALL (PUBLIC)
  ========================= */
  async getAll(req, res, next) {
    try {
      const medias = await Media.findAll({
        where: { is_validated: true },
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Recipe,
            as: 'seen_in_recipes',
            attributes: ['id', 'title', 'img_url'],
            through: { attributes: [] },
          },
        ],
      });

      return res.status(httpStatusCodes.OK).json(medias);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     GET ONE (PUBLIC)
     created_by forcé pour le front
  ========================= */
  async getOne(req, res, next) {
    try {
      const media = await Media.findByPk(req.params.id, {
        attributes: { include: ['created_by'] },
        include: [
          {
            model: Recipe,
            as: 'seen_in_recipes',
            attributes: ['id', 'title', 'img_url'],
            through: { attributes: [] },
          },
        ],
      });

      if (!media) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Œuvre introuvable' });
      }

      return res.status(httpStatusCodes.OK).json(media);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     ADMIN – PENDING
  ========================= */
  async getPending(req, res, next) {
    try {
      const medias = await Media.findAll({
        where: { is_validated: false },
        attributes: ['id', 'title', 'category', 'created_at', 'created_by'],
        order: [['created_at', 'DESC']],
      });

      return res.status(httpStatusCodes.OK).json(medias);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     ADMIN – VALIDATE
  ========================= */
  async validate(req, res, next) {
    try {
      const media = await Media.findByPk(req.params.id);

      if (!media) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Œuvre introuvable' });
      }

      media.is_validated = true;
      media.validated_by = req.user.id;
      await media.save();

      return res.status(httpStatusCodes.OK).json(media);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     CREATE (MEMBER / ADMIN)
     image + recettes
  ========================= */
  async create(req, res, next) {
    try {
      const { recipes, ...data } = req.body;

      let filename = null;

      if (req.file) {
        filename = getExactImageName(data.title); // 🔥 Leo → Leo.jpg
        const filePath = path.join(IMG_DIR, filename);

        // 🔥 écrase si existe
        fs.writeFileSync(filePath, req.file.buffer);
      }


      const mediaData = {
        ...data,
        img_url: filename,
        created_by: req.user.id,
        is_validated: req.user.role === 'admin',
      };

      // 🔥 SEULEMENT SI ADMIN
      if (req.user.role === 'admin') {
        mediaData.validated_by = req.user.id;
      }

      const media = await Media.create(mediaData);


      if (recipes) {
        const recipeIds = Array.isArray(recipes)
          ? recipes
          : JSON.parse(recipes);

        await media.setSeen_in_recipes(recipeIds);
      }

      const mediaWithRecipes = await Media.findByPk(media.id, {
        include: [
          {
            model: Recipe,
            as: 'seen_in_recipes',
            attributes: ['id', 'title', 'img_url'],
            through: { attributes: [] },
          },
        ],
      });

      return res
        .status(httpStatusCodes.CREATED)
        .json(mediaWithRecipes);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     UPDATE (ADMIN / CRÉATEUR)
     image + recettes
  ========================= */
  async update(req, res, next) {
    try {
      const { recipes, ...data } = req.body;

      const media = await Media.findByPk(req.params.id);

      if (!media) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Œuvre introuvable' });
      }

      // ✅ PLUS AUCUNE RESTRICTION DE RÔLE
      await media.update(data);
      if (req.file && media.img_url && media.img_url !== getExactImageName(media.title)) {
        const oldPath = path.join(IMG_DIR, media.img_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      /* ===== IMAGE ===== */
      if (req.file) {
        const filename = getExactImageName(media.title);
        const filePath = path.join(IMG_DIR, filename);

        fs.writeFileSync(filePath, req.file.buffer);

        media.img_url = filename;
        await media.save();
      }


      /* ===== RECETTES ===== */
      if (recipes) {
        const recipeIds = Array.isArray(recipes)
          ? recipes
          : JSON.parse(recipes);

        await media.setSeen_in_recipes(recipeIds);
      }

      const mediaWithRecipes = await Media.findByPk(media.id, {
        include: [
          {
            model: Recipe,
            as: 'seen_in_recipes',
            attributes: ['id', 'title', 'img_url'],
            through: { attributes: [] },
          },
        ],
      });

      return res.status(httpStatusCodes.OK).json(mediaWithRecipes);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     DELETE (ADMIN / CRÉATEUR)
  ========================= */
  async delete(req, res, next) {
    try {
      const media = await Media.findByPk(req.params.id);

      if (!media) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Œuvre introuvable' });
      }
      await media.destroy();
      return res.sendStatus(httpStatusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },
};  