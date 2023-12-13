import { Boisson } from "./Boisson.js";
import { Dessert } from "./Dessert.js";
import { Ingredient } from "./Ingredient.js";
import { Menu } from "./Menu.js";
import { Plat } from "./Plat.js";
import { Restaurant } from "./Restaurant.js";
import { Tag } from "./Tag.js";
import { User } from "./User.js";

export const MenuHasPlat = sequelize.define("menu_has_plat", {}, { tableName: "menu_has_plat" });

//Un Menu posséde plusieurs Plat
Menu.belongsToMany(Plat, {
    as: "plats", 
    through: "menu_has_plat", 
    foreignKey: "menu_id", 
    otherKey: "plat_id",
});

//Un Plat appartient a plusieurs Menu
Plat.belongsToMany(Menu, {
    as: "menus",
    through: "menu_has_plat",
    otherKey: "menu_id",
    foreignKey: "plat_id",
})

export const MenuHasBoisson = sequelize.define("menu_has_boisson", {}, { tableName: "menu_has_boisson" });

//Un Menu posséde plusieurs Boisson
Menu.belongsToMany(Boisson, {
    as: "boissons", 
    through: "menu_has_boisson", 
    foreignKey: "menu_id", 
    otherKey: "boisson_id",
})

//Une Boisson appartient a plusieurs Menu
Boisson.belongsToMany(Menu, {
    as: "menus",
    through: "menu_has_boisson",
    otherKey: "menu_id",
    foreignKey: "boisson_id",
})

export const MenuHasDessert = sequelize.define("menu_has_dessert", {}, { tableName: "menu_has_dessert" });

//Un Menu posséde plusieurs Dessert
Menu.belongsToMany(Dessert, {
    as: "desserts", 
    through: "menu_has_dessert", 
    foreignKey: "menu_id", 
    otherKey: "dessert_id",
})

//Un Dessert appartient a plusieurs Menu
Dessert.belongsToMany(Menu, {
    as: "menus",
    through: "menu_has_dessert",
    otherKey: "menu_id",
    foreignKey: "dessert_id",
})

export const PlatHasTag = sequelize.define("plat_has_tag", {}, { tableName: "plat_has_tag" });

//Un Plat posséde plusieur Tag
Plat.belongsToMany(Tag, {
    as: "tags", 
    through: "plat_has_tag", 
    foreignKey: "plat_id", 
    otherKey: "tag_id",
})

//Un Tag appartient a plusieurs Plat
Tag.belongsToMany(Plat, {
    as: "plats",
    through: "plat_has_tag",
    otherKey: "plat_id",
    foreignKey: "tag_id",
})



