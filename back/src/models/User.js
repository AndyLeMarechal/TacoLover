import { sequelize } from "./sequelize-client.js";
import { Model, DataTypes } from "sequelize";

export class User extends Model {}

User.init({
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    frstname: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    adress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    sequelize,
  tableName: "user"
})