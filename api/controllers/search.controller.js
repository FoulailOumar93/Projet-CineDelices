import { Op, cast, col, where } from 'sequelize';
import { Recipe, Media } from '../models/index.js';
import { httpStatusCodes } from '../errors/http.errors.js';

export const searchController = {
  async search(req, res) {
    try {
      const { q = '', sort = 'recent' } = req.query;

      /* =========================
         WHERE QUERY (q optionnel)
      ========================= */
      const queryLike = q
        ? { [Op.iLike]: `%${q}%` }
        : null;

      const recipeWhere = {
        is_validated: true,
        ...(q && {
          [Op.or]: [
            { title: queryLike },
            { instructions: queryLike },
            where(cast(col('category'), 'text'), queryLike),
          ],
        }),
      };

      const mediaWhere = {
        is_validated: true,
        ...(q && {
          [Op.or]: [
            { title: queryLike },
            where(cast(col('category'), 'text'), queryLike),
          ],
        }),
      };

      /* =========================
         ORDER (TRI)
      ========================= */
      let order = [['createdAt', 'DESC']]; // recent par défaut

      if (sort === 'az') {
        order = [['title', 'ASC']];
      }

      /* =========================
         FETCH DATA
      ========================= */
      const recipes = await Recipe.findAll({
        where: recipeWhere,
        order,
        attributes: ['id', 'title', 'category', 'img_url', 'createdAt'],
      });

      const medias = await Media.findAll({
        where: mediaWhere,
        order,
        attributes: ['id', 'title', 'category', 'img_url', 'createdAt'],
      });

      /* =========================
         MERGE RESULTS
      ========================= */
      const results = [
        ...recipes.map((r) => ({ type: 'recipe', ...r.toJSON() })),
        ...medias.map((m) => ({ type: 'media', ...m.toJSON() })),
      ];

      return res.json({
        query: q || null,
        count: results.length,
        results,
      });

    } catch (err) {
      console.error('❌ Erreur lors de la recherche :', err);
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Erreur interne du serveur.' });
    }
  },
};