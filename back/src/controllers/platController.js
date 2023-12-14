import { Plat } from "../models/index.js";

export async function getAllPlats(req, res) {
    const plats = await Plat.findAll({
        include: 'tags'
    })
    res.json(plats)
};

export async function getOnePlat(req, res) {
    const platId = req.params.id;
    const plat = await Plat.findByPk(platId);
    res.json(plat);
};

export async function createdPlat(req, res) {
    const body = req.body;
    const createdPlat = await Plat.create({
        title: body.title,
        description: body.description
    });
    res.json(createdPlat)
};

export async function updatedPlat(req, res) {
    const platId = req.params.id;
    const body = req.body;
    const plat = await Plat.findByPk(platId);
    const updatedPlat = await plat.update({
        title: body.title,
        description: body.description
    });
    res.json(updatedPlat)
};

export async function deletedPlat(req, res) {
    const platId = req.params.id;
    const plat = await Plat.findByPk(platId);
    const deletedPlat = await plat.destroy();
    res.json(deletedPlat);
};