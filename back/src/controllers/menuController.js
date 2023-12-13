import { Menu, Plat, Boisson, Dessert } from "../models/index.js";


export async function getAllMenus(req, res) {
    const menus = await Menu.findAll();
    // console.log(menus)
    res.json(menus)
};

export async function getOneMenu(req, res) {
    const menuId = req.params.id;
    const menu = await Menu.findByPk(menuId, {
        include: ['plats','boissons','desserts']
    });
    // console.log(menu)
    res.json(menu)
};