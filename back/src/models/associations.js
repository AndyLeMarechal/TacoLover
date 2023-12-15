import { sequelize } from "./sequelize-client.js";

import { Drink } from "./Drink.js";
import { Dessert } from "./Dessert.js";
import { Menu } from "./Menu.js";
import { Plat } from "./Plat.js";
import { Tag } from "./Tag.js";

export const MenuHasPlat = sequelize.define("menu_has_plat", {}, { tableName: "menu_has_plat" });

//Un Menu posséde plusieurs Plat
Menu.belongsToMany(Plat, {
  as: "plats", 
  through: MenuHasPlat, 
  foreignKey: "menu_id", 
  otherKey: "plat_id",
});

//Un Plat appartient a plusieurs Menu
Plat.belongsToMany(Menu, {
  as: "menus",
  through: MenuHasPlat,
  otherKey: "menu_id",
  foreignKey: "plat_id",
});

export const MenuHasDrink = sequelize.define("menu_has_drink", {}, { tableName: "menu_has_drink" });

//Un Menu posséde plusieurs Boisson
Menu.belongsToMany(Drink, {
  as: "drinks", 
  through: MenuHasDrink, 
  foreignKey: "menu_id", 
  otherKey: "drink_id",
});

//Une Boisson appartient a plusieurs Menu
Drink.belongsToMany(Menu, {
  as: "menus",
  through: MenuHasDrink,
  otherKey: "menu_id",
  foreignKey: "drink_id",
});

export const MenuHasDessert = sequelize.define("menu_has_dessert", {}, { tableName: "menu_has_dessert" });

//Un Menu posséde plusieurs Dessert
Menu.belongsToMany(Dessert, {
  as: "desserts", 
  through: MenuHasDessert, 
  foreignKey: "menu_id", 
  otherKey: "dessert_id",
});

//Un Dessert appartient a plusieurs Menu
Dessert.belongsToMany(Menu, {
  as: "menus",
  through: MenuHasDessert,
  otherKey: "menu_id",
  foreignKey: "dessert_id",
});

export const PlatHasTag = sequelize.define("plat_has_tag", {}, { tableName: "plat_has_tag" });

//Un Plat posséde plusieur Tag
Plat.belongsToMany(Tag, {
  as: "tags", 
  through: PlatHasTag, 
  foreignKey: "plat_id", 
  otherKey: "tag_id",
});

//Un Tag appartient a plusieurs Plat
Tag.belongsToMany(Plat, {
  as: "plats",
  through: PlatHasTag,
  otherKey: "plat_id",
  foreignKey: "tag_id",
});



