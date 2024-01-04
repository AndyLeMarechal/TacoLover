import { Plat } from "../models/index.js";
import postPlat from "../../middlewares/schemas/postPlat.js";
import patchPlat from "../../middlewares/schemas/patchPlat.js";

export async function getAllPlats(req, res) {
  try{
    const plats = await Plat.findAll({
      order: ["id"],
      include: 'tags'
    });
    if(!plats){
      return res.status(404).json({error: '/plats not found.'});
    }
    res.status(200).json(plats);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function getOnePlat(req, res) {
  try{
    const platId = Number.parseInt(req.params.id, 10);
    if(isNaN(platId)){
      return res.status(400).json({error: 'Plat ID should be a valid integer'});
    }
    const plat = await Plat.findByPk(platId,{
      order: ["id"],});
    if(!plat){
      return res.status(404).json({error: 'Plat not found. Please verify the provided id.'});
    }
    res.status(200).json(plat);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function createdPlat(req, res) {
  try{
    const platId = Number.parseInt(req.params.id, 10);
    if(isNaN(platId)){
      return res.status(400).json({error: 'Plat ID should be a valid integer'});
    }
    const plat = await Plat.findByPk(platId);
    if(!plat){
      return res.status(404).json({error: 'Plat not found. Please verify the provided id.'});
    }
    const createPlatSchema = postPlat;
    const { error } = createPlatSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }
  
    const createdPlat = await Plat.create({
      title: req.body.title,
      description: req.body.description,
      price_in_euro: req.body.price_in_euro ||'.' ,
      img: req.body.img || "." 
    });
    res.status(201).json(createdPlat);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function updatedPlat(req, res) {
  try{
    const platId = Number.parseInt(req.params.id, 10);
    if(isNaN(platId)){
      return res.status(400).json({error: 'Plat ID should be a valid integer'});
    }
    const plat = await Plat.findByPk(platId);
    if(!plat){
      return res.status(404).json({error: 'Plat not found. Please verify the provided id.'});
    }
  
    const updatePlatSchema = patchPlat;
    const { error } = updatePlatSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }
  
    const updatedPlat = await plat.update({
      title: req.body.title,
      description: req.body.description,
      price_in_euro: req.body.price_in_euro,
      img: req.body.img
    });
    res.status(200).json(updatedPlat);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function deletedPlat(req, res) {
  try{
    const platId = Number.parseInt(req.params.id, 10);
    if(isNaN(platId)){
      return res.status(400).json({error: 'Plat ID should be a valid integer'});
    }
    const plat = await Plat.findByPk(platId);
    if(!plat){
      return res.status(404).json({error: 'Plat not found. Please verify the provided id.'});
    }
    await plat.destroy();
    res.status(204).end();
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}
