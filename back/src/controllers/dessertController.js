import { Dessert } from "../models/Dessert.js"

export async function getAllDesserts(req, res) {
    const desserts = await Dessert.findAll();
    res.json(desserts);
};

export async function getOneDessert(req, res) {
    const dessertId = req.params.id;
    const dessert = await Dessert.findByPk(dessertId);
    res.json(dessert);
};

export async function createdDessert(req, res) {
    const body = req.body;
    const createdDessert = await Dessert.create({
        title: body.title,
        price: body.price ||"€" ,
        img: body.img || "."
    })
    res.json(createdDessert);
};

export async function updatedDessert(req, res) {
    const dessertId = req.params.id;
    const body = req.body;
    const dessert = await Dessert.findByPk(dessertId);
    const updatedDessert = await dessert.update({
        title: body.title
    });
    res.json(updatedDessert);
};

export async function deletedDessert(req, res) {
    const dessertId = req.params.id;
    const dessert = await Dessert.findByPk(dessertId);
    const deletedDessert = await dessert.destroy();
    res.json(deletedDessert);
}