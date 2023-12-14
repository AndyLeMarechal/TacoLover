import { Menu } from "../models/index.js";


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

export async function createdMenu(req, res) {
    const body = req.body;
    const menu = await Menu.create({
        title: body.title,
        description: body.description,
        price: body.price ||"€" ,
        img: body.img || "."
    });
    res.json(menu)
};

export async function updatedMenu(req, res) {
    const menuId = req.params.id;
    const body = req.body;
    const menu = await Menu.findByPk(menuId);

    const updatedMenu = await menu.update({
        title: body.title,
        description: body.description
    });

    res.json(updatedMenu);

};

export async function deletedMenu(req, res) {
    const menuId = req.params.id;
    const menu = await Menu.findByPk(menuId);
    const deletedMenu = await menu.destroy();
    res.json(deletedMenu)
};