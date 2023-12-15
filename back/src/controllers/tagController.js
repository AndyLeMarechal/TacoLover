import { Tag } from "../models/index.js";
import Joi from 'joi';

export async function getAllTags(req, res) {
    const tags = await Tag.findAll();
    if(!tags){
        return res.status(404).json({error: '/tags not found.'})
    };
    res.status(200).json(tags);
};

export async function getOneTag(req, res) {
    const tagId = Number.parseInt(req.params.id, 10);
    if(isNaN(tagId)){
        return res.status(400).json({error: 'Tag ID should be a valid integer'})
    };
    const tag = await Tag.findByPk(tagId);
    if(!tag){
        return res.status(404).json({error: 'Tag not found. Please verify the provided id.'})
    };
    res.status(200).json(tag);
};

export async function createdTag(req, res) {
    const createTagSchema = Joi.object({
        name: Joi.string()
        .alphanum()
        .min(3)
        .max(40)
        .required(),

        color: Joi.string()
        .hex()
    })
  const { error } = createTagSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

    const createdTag = await Tag.create({
        name: req.body.name,
        color: req.body.color
    });
    res.status(201).json(createdTag);
};

export async function updatedTag(req, res) {
    const tagId = Number.parseInt(req.params.id, 10);
    if(isNaN(tagId)){
        return res.status(400).json({error: 'Tag ID should be a valid integer'})
    };
    const tag = await Tag.findByPk(tagId);
    if(!tag){
        return res.status(404).json({error: 'Tag not found. Please verify the provided id.'})
    };
    const updateTagSchema = Joi.object({
        name: Joi.string()
        .alphanum()
        .min(3)
        .max(40)
        .required(),

        color: Joi.string()
        .hex()
    })
  const { error } = updateTagSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }
    const updatedTag = await tag.update({
        name: req.body.name,
        color: req.body.color
    });
    res.status(200).json(updatedTag);
};

export async function deletedTag(req, res) {
    const tagId = Number.parseInt(req.params.id, 10);
    if(isNaN(tagId)){
        return res.status(400).json({error: 'Tag ID should be a valid integer'})
    };
    const tag = await Tag.findByPk(tagId);
    if(!tag){
        return res.status(404).json({error: 'Tag not found. Please verify the provided id.'})
    };
    await tag.destroy();
    res.status(201).end();
};