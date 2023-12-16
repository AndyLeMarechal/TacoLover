import { Plat } from "../models/index.js";
import Joi from 'joi';

export async function getAllPlats(req, res) {
  const plats = await Plat.findAll({
    order: ["id"],
    include: 'tags'
  });
  if(!plats){
    return res.status(404).json({error: '/plats not found.'});
  }
  res.status(200).json(plats);
}

export async function getOnePlat(req, res) {
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

export async function createdPlat(req, res) {
  const createPlatSchema = Joi.object({
    description: Joi.string()
      .min(3)
      .max(200)
      .required(),

    title: Joi.string()
      .min(3)
      .max(40)
      .required(),

    price_in_euro: Joi.number()
      .min(1)
      .max(4)
      .required(),

    img: Joi.string().empty('').dataUri()
  });
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

export async function updatedPlat(req, res) {
  const platId = Number.parseInt(req.params.id, 10);
  if(isNaN(platId)){
    return res.status(400).json({error: 'Plat ID should be a valid integer'});
  }
  const plat = await Plat.findByPk(platId);
  if(!plat){
    return res.status(404).json({error: 'Plat not found. Please verify the provided id.'});
  }

  const updatePlatSchema = Joi.object({
    description: Joi.string()
      .min(3)
      .max(200)
      .required(),

    title: Joi.string()
      .min(3)
      .max(40)
      .required(),

    price_in_euro: Joi.number()
      .min(1)
      .max(4)
      .required(),

    img: Joi.string().empty('').dataUri()
  });
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

export async function deletedPlat(req, res) {
  const platId = req.params.id;
  const plat = await Plat.findByPk(platId);
  await plat.destroy();
  res.status(204).end();
}