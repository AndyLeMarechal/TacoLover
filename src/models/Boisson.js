import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Boisson extends Model {}

Boisson.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    soft: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    sequelize,
  tableName: "boisson"
})