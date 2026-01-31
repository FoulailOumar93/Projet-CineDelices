# Problématiques

- si on utilise une API type mealdb pour récupérer les contenus complets associé à une recette donnée (liste des ingrédients, instructions, nom de la recette etc) alors il n'est pas nécessaire de stocker en BDD le contenu complet de cette recette, juste son numéro de référencement dans l'API ET sa ou ses catégorie(s) personalisée pour le filtrage du site (entrée, plat, dessert, sucré, salé...) pour que les données soient appelées via l'API lors du chargement des pages où elles sont requises
- idem pour les films, il est possible de n'avoir à créer et stocker en BDD qu'une sélection très limitée de données (ex : numéro de référence, nom , image, anecdote, catégorie) par film pour pouvoir ensuite faire une table de liaison avec la table de recettes
- cependant, cela complique la fonctionnalité d'ajout d'une recette puisque il devient impossible d'ajouter une recette sans se référer au format exact de l'API...
