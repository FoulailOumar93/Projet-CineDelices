import { sequelize } from '../../models/sequelize.client.js';

await sequelize.sync({ force: true }); //  force: true = supprimer les tables existantes puis les recréer
console.log('✅ All models were synchronized successfully');

// ferme manuellement la connexion
await sequelize.close();