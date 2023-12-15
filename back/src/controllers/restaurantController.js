import { Restaurant } from "../models/index.js";
import Joi from 'joi';

export async function getAllRestaurants(req, res) {
  const restaurants = await Restaurant.findAll({
    order: ["id"],});
  if(!restaurants){
    return res.status(404).json({error: '/restaurants not found.'});
  }
  res.status(200).json(restaurants);
}

export async function getOneRestaurant(req, res) {
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

export async function createdRestaurant(req, res) {
  const createRestaurantSchema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(40)
      .required(),

    address: Joi.string()
      .min(3)
      .max(200)
      .required()
  });
  const { error } = createRestaurantSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

  const createdRestaurant = await Restaurant.create({
    name: req.body.name,
    address: req.body.address
  });
  res.status(201).json(createdRestaurant);
}

export async function updatedRestaurant(req, res) {
  const restaurantId = Number.parseInt(req.params.id, 10);
  if(isNaN(restaurantId)){
    return res.status(400).json({error: 'Restaurant ID should be a valid integer'});
  }
  const restaurant = await Restaurant.findByPk(restaurantId);
  if(!restaurant){
    return res.status(404).json({error: 'Restaurant not found. Please verify the provided id.'});
  }

  const updateRestaurantSchema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(40)
      .required(),

    address: Joi.string()
      .min(3)
      .max(200)
      .required()
  });
  const { error } = updateRestaurantSchema.validate(req.body);
  if (error) { return res.status(400).json({ error: error.message }); }

  const updatedRestaurant = await restaurant.update({
    name: req.body.name,
    address: req.body.address
  });
  res.status(200).json(updatedRestaurant);
}

export async function deletedRestaurant(req, res) {
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