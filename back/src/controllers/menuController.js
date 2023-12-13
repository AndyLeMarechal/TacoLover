import { Menu, Plat, Boisson, Dessert } from "../models/index.js";

export async function getAllMenus(req, res) {
    const menus = Menu.findAll({
        order: ['created_at', 'DESC'],
    });
    console.log(menus)
    res.json(menus)
}