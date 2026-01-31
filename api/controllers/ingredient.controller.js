import { Ingredient } from '../models/index.js';
import { httpStatusCodes } from '../errors/http.errors.js';

/* =========================
   INGREDIENT CONTROLLER
========================= */
export const ingredientController = {

  /* =========================
     GET ALL (PUBLIC)
  ========================= */
  async getAll(req, res, next) {
    try {
      const ingredients = await Ingredient.findAll({
        where: { is_validated: true },
        order: [['name', 'ASC']],
      });

      return res.status(httpStatusCodes.OK).json(ingredients);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     GET ONE (PUBLIC)
  ========================= */
  async getOne(req, res, next) {
    try {
      const ingredient = await Ingredient.findByPk(req.params.id);

      if (!ingredient) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Ingrédient introuvable' });
      }

      return res.status(httpStatusCodes.OK).json(ingredient);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     GET PENDING (ADMIN)
  ========================= */
  async getPending(req, res, next) {
    try {
      const ingredients = await Ingredient.findAll({
        where: { is_validated: false },
        order: [['created_at', 'DESC']],
      });

      return res.status(httpStatusCodes.OK).json(ingredients);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     VALIDATE (ADMIN)
  ========================= */
  async validate(req, res, next) {
    try {
      const ingredient = await Ingredient.findByPk(req.params.id);

      if (!ingredient) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Ingrédient introuvable' });
      }

      ingredient.is_validated = true;
      ingredient.validated_by = req.user?.id ?? null;
      await ingredient.save();


      return res.status(httpStatusCodes.OK).json(ingredient);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     CREATE (AUTH)
  ========================= */
  async create(req, res, next) {
    try {
      const { name, culinary_profile } = req.body;

      if (!name) {
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ error: 'Nom requis' });
      }

      const ingredient = await Ingredient.create({
        name,
        culinary_profile: culinary_profile || 'neutre',
        is_validated: req.user?.role === 'admin',
        validated_by: req.user?.role === 'admin' ? req.user.id : null,
      });

      return res.status(httpStatusCodes.CREATED).json(ingredient);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     UPDATE (AUTH)
  ========================= */
  async update(req, res, next) {
    try {
      const ingredient = await Ingredient.findByPk(req.params.id);

      if (!ingredient) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Ingrédient introuvable' });
      }

      const { name, culinary_profile } = req.body;

      if (name !== undefined) ingredient.name = name;
      if (culinary_profile !== undefined)
        ingredient.culinary_profile = culinary_profile;

      await ingredient.save();

      return res.status(httpStatusCodes.OK).json(ingredient);
    } catch (e) {
      next(e);
    }
  },

  /* =========================
     DELETE (AUTH)
  ========================= */
  async delete(req, res, next) {
    try {
      const ingredient = await Ingredient.findByPk(req.params.id);

      if (!ingredient) {
        return res
          .status(httpStatusCodes.NOT_FOUND)
          .json({ error: 'Ingrédient introuvable' });
      }

      await ingredient.destroy();
      return res.sendStatus(httpStatusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  },
};