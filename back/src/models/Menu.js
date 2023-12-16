import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Menu extends Model {}

Menu.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
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
  tableName: "menu"
});