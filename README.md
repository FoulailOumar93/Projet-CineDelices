# 🎬 CinéDélices

CinéDélices est une application web qui fait le lien entre le cinéma et la cuisine.  
Elle permet de découvrir des recettes inspirées de films, séries, mangas et animations, et de les reproduire facilement chez soi.

Le projet a été réalisé dans le cadre de la formation **Développeur Web et Web Mobile (DWWM)**.

---

## 🎯 Objectifs du projet

- Centraliser des recettes vues à l’écran (films, séries, mangas)
- Proposer une plateforme accessible au grand public
- Mettre en pratique une architecture **full-stack**
- Implémenter une gestion des rôles et des droits utilisateurs
- Concevoir et exploiter une base de données relationnelle

---

## 👥 Types d’utilisateurs

- **Visiteur**
  - Consulter les recettes
  - Rechercher par critères
  - Accéder aux fiches recettes et aux médias associés

- **Membre**
  - Créer un compte
  - Se connecter
  - Soumettre des recettes
  - Gérer son profil

- **Administrateur**
  - Valider les recettes et médias soumis
  - Gérer les utilisateurs
  - Modifier ou supprimer les contenus

---

## ⚙️ Fonctionnalités principales (MVP)

- Authentification (inscription / connexion)
- Consultation des recettes
- Recherche par critères
- Association recettes ↔ œuvres (films, séries, mangas)
- Gestion des ingrédients
- Validation des contenus par un administrateur
- Interface responsive (mobile / tablette / desktop)

---

## 🧱 Stack technique

### Front-end
- React
- Vite
- JavaScript
- CSS / Tailwind

### Back-end
- Node.js
- Express
- Sequelize
- PostgreSQL

### Outils
- Git / GitHub
- Discord (communication)
- Trello (organisation)

## Installation du projet

```# Cloner le dépôt
git clone <URL_SSH>

# Se déplacer dans le dépôt
cd <NOM_DEPOT>

# Installer les dépendances de l'API
npm install --prefix api

# Installer les dépendances du front
npm install --prefix front

# Créer les fichiers d'environnement
cp ./api/.env.example ./api/.env
cp ./client/.env.example ./client/.env

# (Si besoin) Ajuster les variables d'environnement
code . # et éditer les 2 fichiers .env```

## Installation de la base de données

```# Se connecter à Postgres via PSQL
sudo -i -u postgres psql

# Créer un utilisateur
CREATE ROLE cinedelices WITH LOGIN PASSWORD 'cinedelices';

# Créer la base de données
CREATE DATABASE cinedelices WITH OWNER cinedelices;

# Quitter PSQL
exit

# (Si besoin) Ajuster les variables d'environnement
code ./api/.env # Vérifier que l'URL de la BDD corresponde bien 

# Réinitialiser la base de données, avec échantillonnage
npm run db:reset --prefix api```

## Lancement du projet

```# Lancer le serveur de l'API (port 3000)
npm run dev --prefix api

# Lancer le client (port ???)
npm run dev --prefix front```
