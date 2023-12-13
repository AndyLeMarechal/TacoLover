import "dotenv/config"; // Doit être chargé AVANT la première utilisateur de process.env

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  logging: false, // Logger les requêtes SQL passées par Sequelize
  define: {
    createdAt: "created_at", // Dire que notre champs `createdAt` s'appelle dans notre BDD `created_at`
    updatedAt: "updated_at"
  }
});