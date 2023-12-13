import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class Tag extends Model {}

Tag.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    color: {
        type: DataTypes.STRING(7)
      }
},{
    sequelize,
  tableName: "tag"
})