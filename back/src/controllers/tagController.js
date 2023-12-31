import { Tag } from "../models/index.js";
import postTag from "../../middlewares/schemas/postTag.js";
import patchTag from "../../middlewares/schemas/patchTag.js";

export async function getAllTags(req, res) {
  try{
    const tags = await Tag.findAll({
      order: ["id"],});
    if(!tags){
      return res.status(404).json({error: '/tags not found.'});
    }
    res.status(200).json(tags);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function getOneTag(req, res) {
  try{
    const tagId = Number.parseInt(req.params.id, 10);
    if(isNaN(tagId)){
      return res.status(400).json({error: 'Tag ID should be a valid integer'});
    }
    const tag = await Tag.findByPk(tagId, {
      order: ["id"],
    });
    if(!tag){
      return res.status(404).json({error: 'Tag not found. Please verify the provided id.'});
    }
    res.status(200).json(tag);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function createdTag(req, res) {
  try{
    const createTagSchema = postTag;
    const { error } = createTagSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }

    const existingTag = await Tag.findOne({ where: { name: req.body.name } });
    if(existingTag){
      return res.status(400).json({error: 'Name is already in use'});
    }
  
    const createdTag = await Tag.create({
      name: req.body.name,
      color: req.body.color
    });
    res.status(201).json(createdTag);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function updatedTag(req, res) {
  try{
    const tagId = Number.parseInt(req.params.id, 10);
    if(isNaN(tagId)){
      return res.status(400).json({error: 'Tag ID should be a valid integer'});
    }
    const tag = await Tag.findByPk(tagId);
    if(!tag){
      return res.status(404).json({error: 'Tag not found. Please verify the provided id.'});
    }
    const updateTagSchema = patchTag;
    const { error } = updateTagSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }

    const existingTag = await Tag.findOne({ where: { name: req.body.name } });
    if(existingTag){
      return res.status(400).json({error: 'Name is already in use'});
    }
    
    const updatedTag = await tag.update({
      name: req.body.name,
      color: req.body.color
    });
    res.status(200).json(updatedTag);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function deletedTag(req, res) {
  try{
    const tagId = Number.parseInt(req.params.id, 10);
    if(isNaN(tagId)){
      return res.status(400).json({error: 'Tag ID should be a valid integer'});
    }
    const tag = await Tag.findByPk(tagId);
    if(!tag){
      return res.status(404).json({error: 'Tag not found. Please verify the provided id.'});
    }
    await tag.destroy();
    res.status(201).end();
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}