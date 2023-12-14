import { Drink } from "../models/index.js";

export async function getAllDrinks(req, res) {
    const drinks = await Drink.findAll();
    res.json(drinks);
};

export async function getOneDrink(req, res) {
    const drinkId = req.params.id;
    const drink = await Drink.findByPk(drinkId);
    res.json(drink);
};

export async function createdDrink(req, res) {
    const body = req.body;
    const createdDrink = await Drink.create({
        title: body.title,
        soft: body.soft
    });
    res.json(createdDrink);
};

export async function updatedDrink(req, res) {
    const drinkId = req.params.id;
    const body = req.body;
    const drink = await Drink.findByPk(drinkId);
    const updatedDrink = await drink.update({
        title: body.title,
        soft: body.soft
    });
    res.json(updatedDrink);
};

export async function deletedDrink(req, res) {
    const drinkId = req.params.id;
    const drink = await Drink.findByPk(drinkId);
    const deletedDrink = await drink.destroy();
    res.json(deletedDrink);
};