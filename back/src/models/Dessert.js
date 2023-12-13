import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Dessert extends Model {}

Dessert.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},{
    sequelize,
  tableName: "dessert"
})