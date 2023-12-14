import { Restaurant } from "../models/index.js";

export async function getAllRestaurants(req, res) {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
};

export async function getOneRestaurant(req, res) {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findByPk(restaurantId);
    res.json(restaurant);
};

export async function createdRestaurant(req, res) {
    const body = req.body;
    const createdRestaurant = await Restaurant.create({
        name: body.name,
        address: body.address
    });
    res.json(createdRestaurant);
};

export async function updatedRestaurant(req, res) {
    const restaurantId = req.params.id;
    const body = req.body;
    const restaurant = await Restaurant.findByPk(restaurantId);
    const updatedRestaurant = await restaurant.update({
        name: body.name,
        address: body.address
    });
    res.json(updatedRestaurant);
};

export async function deletedRestaurant(req, res) {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findByPk(restaurantId);
    const deletedRestaurant = await restaurant.destroy();
    res.json(deletedRestaurant);
};