import { Dessert } from "../models/Dessert.js";
import postDessert from "../../middlewares/schemas/postDessert.js";
import patchDessert from "../../middlewares/schemas/patchDessert.js";

export async function getAllDesserts(req, res) {
  try{
    const desserts = await Dessert.findAll({
      order: ["id"],});
    console.log(desserts);
    if(!desserts){
      return res.status(404).json({error: '/desserts not found'});
    }
    res.status(200).json(desserts);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function getOneDessert(req, res) {
  try{
    const dessertId = Number.parseInt(req.params.id, 10);
    if(isNaN(dessertId)){
      return res.status(400).json({error: 'Dessert ID should be a valid integer'});
    }

    const dessert = await Dessert.findByPk(dessertId,{
      order: ["id"],});
    if(!dessert){
      return res.status(404).json({error: 'Dessert not found. Please verify the provided id.'});
    }
    res.status(200).json(dessert);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function createdDessert(req, res) {
  try{
    const createDessertSchema = postDessert;
    const { error } = createDessertSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }
  
    const existingDessert = await Dessert.findOne({ where: { title: req.body.title } });
    if (existingDessert) {
      return res.status(400).json({error: 'Title is already in use'});
    }
    
    const createdDessert = await Dessert.create({
      title: req.body.title,
      price_in_euro: req.body.price_in_euro || "0" ,
      img: req.body.img || "."
    });
    res.status(201).json(createdDessert); 
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function updatedDessert(req, res) {
  try{
    const dessertId = Number.parseInt(req.params.id, 10);
    if(isNaN(dessertId)){
      return res.status(400).json({error: 'Dessert ID should be a valid integer'});
    }
  
    const dessert = await Dessert.findByPk(dessertId);
    if(!dessert){
      return res.status(404).json({error: 'Dessert not found. Please verify the provided id.'});
    }
  
    const updateDessertSchema = patchDessert;
    const { error } = updateDessertSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }

    const existingDessert = await Dessert.findOne({ where: { title: req.body.title } });
    if (existingDessert) {
      return res.status(400).json({error: 'Title is already in use'});
    }
  
    const updatedDessert = await dessert.update({
      title: req.body.title,
      price_in_euro: req.body.price_in_euro,
      img: req.body.img
    });
    res.status(200).json(updatedDessert); 
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function deletedDessert(req, res) {
  try{
    const dessertId = Number.parseInt(req.params.id, 10);
    if(isNaN(dessertId)){
      return res.status(400).json({error: 'Dessert ID should be a valid integer'});
    }
  
    const dessert = await Dessert.findByPk(dessertId);
    if(!dessert){
      return res.status(404).json({error: 'Dessert not found. Please verify the provided id.'});
    }
    await dessert.destroy();
    res.status(204).end(); 
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}