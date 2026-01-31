# projet-cinedelices

Un projet DWWM par Laure-Hélène, Florian K., Johann, Oumar

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
