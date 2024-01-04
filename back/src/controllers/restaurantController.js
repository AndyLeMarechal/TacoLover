import { Restaurant } from "../models/index.js";
import postRestaurant from "../../middlewares/schemas/postRestaurant.js";
import patchRestaurant from "../../middlewares/schemas/patchRestaurant.js";

export async function getAllRestaurants(req, res) {
  try{
    const restaurants = await Restaurant.findAll({
      order: ["id"],});
    if(!restaurants){
      return res.status(404).json({error: '/restaurants not found.'});
    }
    res.status(200).json(restaurants);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function getOneRestaurant(req, res) {
  try{
    const restaurantId = Number.parseInt(req.params.id, 10);
    if(isNaN(restaurantId)){
      return res.status(400).json({error: 'Restaurant ID should be a valid integer'});
    }
    const restaurant = await Restaurant.findByPk(restaurantId,{
      order: ["id"],});
    if(!restaurant){
      return res.status(404).json({error: 'Restaurant not found. Please verify the provided id.'});
    }
    res.status(200).json(restaurant);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function createdRestaurant(req, res) {
  try{
    const createRestaurantSchema = postRestaurant;
    const { error } = createRestaurantSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }

    const existingRestaurant = await Restaurant.findOne({ where: { name: req.body.name } });
    if(existingRestaurant){
      return res.status(400).json({error: 'Name is already in use'});
    }
  
    const createdRestaurant = await Restaurant.create({
      name: req.body.name,
      address: req.body.address
    });
    res.status(201).json(createdRestaurant);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function updatedRestaurant(req, res) {
  try{
    const restaurantId = Number.parseInt(req.params.id, 10);
    if(isNaN(restaurantId)){
      return res.status(400).json({error: 'Restaurant ID should be a valid integer'});
    }
    const restaurant = await Restaurant.findByPk(restaurantId);
    if(!restaurant){
      return res.status(404).json({error: 'Restaurant not found. Please verify the provided id.'});
    }
  
    const updateRestaurantSchema = patchRestaurant;
    const { error } = updateRestaurantSchema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.message }); }

    const existingRestaurant = await Restaurant.findOne({ where: { name: req.body.name } });
    if(existingRestaurant){
      return res.status(400).json({error: 'Name is already in use'});
    }
  
    const updatedRestaurant = await restaurant.update({
      name: req.body.name,
      address: req.body.address
    });
    res.status(200).json(updatedRestaurant);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}


export async function deletedRestaurant(req, res) {
  try{
    const restaurantId = Number.parseInt(req.params.id, 10);
    if(isNaN(restaurantId)){
      return res.status(400).json({error: 'Restaurant ID should be a valid integer'});
    }
    const restaurant = await Restaurant.findByPk(restaurantId);
    if(!restaurant){
      return res.status(404).json({error: 'Restaurant not found. Please verify the provided id.'});
    }
    await restaurant.destroy();
    res.status(204).end();
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: '500 Internal Server Error'});
  }
}