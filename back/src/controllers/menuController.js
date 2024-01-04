import { Menu } from "../models/index.js";
import postMenu from "../../middlewares/schemas/postMenu.js";
import patchMenu from "../../middlewares/schemas/patchMenu.js";

export async function getAllMenus(req, res) {
  try{
    const menus = await Menu.findAll({
      order: ["id"],
      include: ['plats','drinks','desserts']
    });
    if(!menus){
      return res.status(404).json({error: '/menus not found.'});
    }
    res.status(200).json(menus);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function getOneMenu(req, res) {
  try{
    const menuId = Number.parseInt(req.params.id, 10);
    if(isNaN(menuId)){
      return res.status(400).json({error: 'Menu ID should be a valid integer'});
    }
    const menu = await Menu.findByPk(menuId, {
      order: ["id"],
      include: ['plats','drinks','desserts']
    });
    if(!menu){
      return res.status(404).json({error: 'Menu not found. Please verify the provided id.'});
    }
    res.status(200).json(menu);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function createdMenu(req, res) {
  try{
    const menuId = Number.parseInt(req.params.id, 10);
    if(isNaN(menuId)){
      return res.status(400).json({error: 'Menu ID should be a valid integer'});
    }
    const menu = await Menu.findByPk(menuId);
    if(!menu){
      return res.status(404).json({error: 'Menu not found. Please verify the provided id.'});
    }
    const createMenuSchema = postMenu;
    const { error } = createMenuSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }

    const existingMenu = await Menu.findOne({ where: { title: req.body.title } });
    if(existingMenu){
      return res.status(400).json({error: 'Title is already in use'});
    }
  
    const createdMenu = await Menu.create({
      title: req.body.title,
      description: req.body.description,
      price_in_euro: req.body.price_in_euro || '0' , 
      img: req.body.img || "."
    });
    res.status(201).json(createdMenu);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function updatedMenu(req, res) {
  try{
    const menuId = Number.parseInt(req.params.id, 10);
    if(isNaN(menuId)){
      return res.status(400).json({error: 'Menu ID should be a valid integer'});
    }
    const menu = await Menu.findByPk(menuId);
    if(!menu){
      return res.status(404).json({error: 'Menu not found. Please verify the provided id.'});
    }
    const updateMenuSchema = patchMenu;
    const { error } = updateMenuSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }

    const existingMenu = await Menu.findOne({ where: { title: req.body.title } });
    if(existingMenu){
      return res.status(400).json({error: 'Title is already in use'});
    }
  
    const updatedMenu = await menu.update({
      title: req.body.title,
      description: req.body.description,
      price_in_euro: req.body.price_in_euro ,
      img: req.body.img
    });
  
    res.status(200).json(updatedMenu);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }

}


export async function deletedMenu(req, res) {
  try{
    const menuId = req.params.id;
    if(isNaN(menuId)){
      return res.status(400).json({error: 'Menu ID should be a valid integer'});
    }
    const menu = await Menu.findByPk(menuId);
    if(!menu){
      return res.status(404).json({error: 'Menu not found. Please verify the provided id.'});
    }
    await menu.destroy();
    res.status(204).end();
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}