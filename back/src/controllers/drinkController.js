import { Drink } from "../models/index.js";
import Joi from 'joi';

export async function getAllDrinks(req, res) {
    const drinks = await Drink.findAll();
    if(!drinks){
        return res.status(404).json({error: '/drinks not found'})
    };
    res.status(200).json(drinks);
};

export async function getOneDrink(req, res) {
    const drinkId = Number.parseInt(req.params.id, 10);
    if(isNaN(drinkId)){
        return res.status(400).json({error: 'Drink ID should be a valid integer'})
    };

    const drink = await Drink.findByPk(drinkId);
    if(!drink){
        return res.status(404).json({error: 'Drink not found. Please verify the provided id.'})
    };
    res.status(200).json(drink);
};


export async function createdDrink(req, res) {
    const createDrinkSchema = Joi.object({
        title: Joi.string()
        .alphanum()
        .min(3)
        .max(40)
        .required(),

        soft: Joi.boolean(),

        price: Joi.string()
        .alphanum()
        .min(1)
        .max(4)
        .required(),

        img: Joi.string().empty('').dataUri()
  })
  const { error } = createDrinkSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

    const createdDrink = await Drink.create({
        title: req.body.title,
        soft: req.body.soft,
        price: req.body.price ||"€" ,
        img: req.body.img || "."
    });
    res.status(201).json(createdDrink);
};

export async function updatedDrink(req, res) {
    const drinkId = Number.parseInt(req.params.id, 10);
    if(isNaN(drinkId)){
        return res.status(400).json({error: 'Drink ID should be a valid integer'})
    };

    const drink = await Drink.findByPk(drinkId);
    if(!drink){
        return res.status(404).json({error: 'Drink not found. Please verify the provided id.'})
    };

    const updateDrinkSchema = Joi.object({
        title: Joi.string()
        .alphanum()
        .min(3)
        .max(40)
        .required(),

        soft: Joi.boolean(),

        price: Joi.string()
        .alphanum()
        .min(1)
        .max(4)
        .required(),

        img: Joi.string().empty('').dataUri()
  })
  const { error } = updateDrinkSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

    const updatedDrink = await drink.update({
        title: req.body.title,
        soft: req.body.soft,
        price: req.body.price + "€" ,
        img: req.body.img
    });
    res.status(200).json(updatedDrink);
};

export async function deletedDrink(req, res) {
    const drinkId = Number.parseInt(req.params.id, 10);
    if(isNaN(drinkId)){
        return res.status(400).json({error: 'Drink ID should be a valid integer'})
    };

    const drink = await Drink.findByPk(drinkId);
    if(!drink){
        return res.status(404).json({error: 'Drink not found. Please verify the provided id.'})
    };
    await drink.destroy();
    res.status(204).end();
};