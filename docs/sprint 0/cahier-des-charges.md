# CINEDELICES

Un site de recettes de cuisine pour cinéphiles regroupant des recettes apparaissant dans vos films et séries TV favoris !

## LES BESOINS ET OBJECTIFS

### Recettes

- Catalogue de recettes : affichage, recherche (par titre de recette ou de film/série), filtre (par catégorie, entrée plat ou dessert par exemple)
- Page recette : ingrédients (sous forme de texte), instructions, film/série associé, informations complémentaires (anecdote par exemple).
  
### Utilisateurs

- Système d'authentification : connexion, inscription, gestion de profil utilisateur.
- Page ajout d’une recette : accessible uniquement pour les personnes connectées.
  
### Administration

- Back-office (administration) : gestion des recettes, des catégories, des utilisateurs.

### Bonus

- Fonctionnalités sociales : commentaires (avec modération dans le back-office), likes, système de notation des recettes.
- Gestion des ingrédients (rappel : en MVP on gère les ingrédients sous forme de texte).
- Catalogue de recettes : ajouter un filtre supplémentaire (par ingrédient).

## MVP

- page d'accueil (avec dernières recettes ajoutées, navigation et recherche)
- page listant toutes les recettes du site par ordre alphabétique
- page listant tous les films du site par ordre alphabétique
- page(s) listant tous les films ou recettes d'une catégorie spécifique (film, série, animé, entrée, plat, dessert...)
- pages individuelles de recette et de film (dont une section listant quelles recettes ou films y sont associés)

## LES TECHNOLOGIES

à définir

- docker ?
- svelte ?
- postgres db ?
- api publique type [https://www.themealdb.com/](https://www.themealdb.com/) ou [https://world.openfoodfacts.org/data/](https://world.openfoodfacts.org/data/)
- thème graphique préfabriqué ?
- React JS (front) => pour une simplicité d'utilisation
- TailwindCSS with DaisyUI (CSS) => permet d'avoir un responsive et un design épuré
- ExpressJS, postgresql, sequelize => tout le monde connais ^-^

## LA CIBLE

Amateurs de cuisine et de cinéma, curieux gourmands, fans de films et de séries. Voir le fichier [PUBLIC.MD](./public.md)

## COMPATIBILITE

Navigateurs PC Desktop & mobile type Chrome, Firefox etc... Voir le fichier [NAVIGATEURS](./présentation_navigateurs.md)

## ARBORESCENCE + ROUTES

- accueil avec navigation et courte liste des dernières recettes ajoutées ou recettes au hasard
- liste des recettes
- liste des films/séries présents sur le site
- pages par catégories
- pages individuelles de fiche-recette
- pages individuelles de recette
- page de profil utilisateur (requiert une connexion utilisateur)
- page d'ajout d'une nouvelle recette (requiert une connexion utilisateur)
- page administration (requiert une connexion admin)

Voir le fichier [ROUTES](./routes.md)

## USER STORIES

Voir le fichier [USER STORIES](./user_stories.md)

## LES ROLES

à définir
