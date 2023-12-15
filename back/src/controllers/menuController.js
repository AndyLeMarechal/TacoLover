import { Menu } from "../models/index.js";
import Joi from 'joi';

export async function getAllMenus(req, res) {
    const menus = await Menu.findAll({
        include: ['plats','drinks','desserts']
    });
    res.status(200).json(menus)
};

export async function getOneMenu(req, res) {
    const menuId = Number.parseInt(req.params.id, 10);
    if(isNaN(menuId)){
        return res.status(400).json({error: 'Menu ID should be a valid integer'})
    };
    const menu = await Menu.findByPk(menuId, {
        include: ['plats','drinks','desserts']
    });
    if(!menu){
        return res.status(404).json({error: 'Menu not found. Please verify the provided id.'})
    };
    res.status(200).json(menu);
};

export async function createdMenu(req, res) {
  const createMenuSchema = Joi.object({
        title: Joi.string()
        .alphanum()
        .min(3)
        .max(40)
        .required(),

        description: Joi.string()
        .min(3)
        .max(200)
        .required(),

        price: Joi.string()
        .alphanum()
        .min(1)
        .max(4)
        .required(),

        img: Joi.string().empty('').dataUri()
  })
  const { error } = createMenuSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

    const menu = await Menu.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price + "€" || "€" ,
        img: req.body.img || "."
    });
    res.status(201).json(menu);
};

export async function updatedMenu(req, res) {
    const menuId = Number.parseInt(req.params.id, 10);
    if(isNaN(menuId)){
        return res.status(400).json({error: 'Menu ID should be a valid integer'})
    };
    const menu = await Menu.findByPk(menuId);
    if(!menu){
        return res.status(404).json({error: 'Menu not found. Please verify the provided id.'})
    };
    const updateMenuSchema = Joi.object({
        title: Joi.string()
        .alphanum()
        .min(3)
        .max(40)
        .required(),

        description: Joi.string()
        .min(3)
        .max(200)
        .required(),

        price: Joi.string()
        .alphanum()
        .min(1)
        .max(4)
        .required(),

        img: Joi.string().empty('').dataUri()
  })
  const { error } = updateMenuSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

    const updatedMenu = await menu.update({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price + "€",
        img: req.body.img
    });

    res.status(200).json(updatedMenu);

};

export async function deletedMenu(req, res) {
    const menuId = req.params.id;
    if(isNaN(menuId)){
        return res.status(400).json({error: 'Menu ID should be a valid integer'})
    };
    const menu = await Menu.findByPk(menuId);
    if(!menu){
        return res.status(404).json({error: 'Menu not found. Please verify the provided id.'})
    };
    await menu.destroy();
    res.status(204).end();
};