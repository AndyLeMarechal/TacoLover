import { Tag } from "../models/index.js";

export async function getAllTags(req, res) {
    const tags = await Tag.findAll();
    res.json(tags);
};

export async function getOneTag(req, res) {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);
    res.json(tag);
};

export async function createdTag(req, res) {
    const body = req.body;
    const createdTag = await Tag.create({
        name: body.name,
        color: body.color
    });
    res.json(createdTag);
};

export async function updatedTag(req, res) {
    const tagId = req.params.id;
    const body = req.body;
    const tag = await Tag.findByPk(tagId);
    const updatedTag = await tag.update({
        name: body.name,
        color: body.color
    });
    res.json(updatedTag);
};

export async function deletedTag(req, res) {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);
    const deletedTag = await tag.destroy();
    res.json(deletedTag);
};