import { Plat } from "../models/index.js";
import Joi from 'joi';

export async function getAllPlats(req, res) {
    const plats = await Plat.findAll({
        include: 'tags'
    })
    res.status(200).json(plats)
};

export async function getOnePlat(req, res) {
    const platId = Number.parseInt(req.params.id, 10);
    if(isNaN(platId)){
        return res.status(400).json({error: 'Plat ID should be a valid integer'})
    };
    const plat = await Plat.findByPk(platId);
    if(!plat){
        return res.status(404).json({error: 'Plat not found. Please verify the provided id.'})
    };
    res.status(200).json(plat);
};

export async function createdPlat(req, res) {
    const createPlatSchema = Joi.object({
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
  const { error } = createPlatSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

    const createdPlat = await Plat.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price ||"€" ,
        img: req.body.img || "." 
    });
    res.status(201).json(createdPlat)
};

export async function updatedPlat(req, res) {
    const platId = Number.parseInt(req.params.id, 10);
    if(isNaN(platId)){
        return res.status(400).json({error: 'Plat ID should be a valid integer'})
    };
    const plat = await Plat.findByPk(platId);
    if(!plat){
        return res.status(404).json({error: 'Plat not found. Please verify the provided id.'})
    };

    const updatePlatSchema = Joi.object({
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
  const { error } = updatePlatSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

    const updatedPlat = await plat.update({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price + "€",
        img: req.body.img
    });
    res.status(200).json(updatedPlat)
};

export async function deletedPlat(req, res) {
    const platId = req.params.id;
    const plat = await Plat.findByPk(platId);
    await plat.destroy();
    res.status(204).end();
};