import { httpStatusCodes } from '../errors/http.errors.js';

// Un handler de bienvenue pour l'API pour la route '/'
export function getWelcomeResponse(_, res) {
  res
    .status(httpStatusCodes.OK)
    .json({
      message: 'Bienvenue sur Cinédélices',
      description: 'API pour Cinédélices, site dédiée aux gastro-geeks.',
      version: '1.0.0',
      routes: {
        recipes: '/recipes',
        medias: '/medias',
        categories: '/categories',
        ingredients: '/ingredients',
      },
    });
}