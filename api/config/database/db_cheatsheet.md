# Comment exécuter le script SQL

- Se connecter à notre serveur Postgres via `psql`

  - `sudo -i -u postgres psql` (ou juste `psql -u postgres` si vous n'avez pas de sudo)

- Créer un utilisateur (admin) pour notre future BDD

  - `CREATE ROLE cinedelices WITH LOGIN PASSWORD 'cinedelices';`

- Créer une base de données

  - `CREATE DATABASE cinedelices WITH OWNER cinedelices;`

- Sortir de `psql`

  - `exit`

Des scripts sont également disponibles dans le [package.json](../package.json) pour automatiser la création des tables et l'insertion de données.

- `npm run db:create`
- `npm run db:seed`
- `npm run db:reset` (execute les deux précédents)
