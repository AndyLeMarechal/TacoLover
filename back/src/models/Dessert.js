import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Dessert extends Model {}

Dessert.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT
    }
},{
    sequelize,
  tableName: "dessert"
})