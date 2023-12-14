import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Plat extends Model {}

Plat.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize,
  tableName: "plat"
})