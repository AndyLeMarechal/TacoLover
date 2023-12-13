import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Restaurant extends Model {}

Restaurant.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},{
    sequelize,
  tableName: "restaurant"
})