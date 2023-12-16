import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Drink extends Model {}

Drink.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  soft: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  price_in_euro: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT
  }
},{
  sequelize,
  tableName: "drink"
});