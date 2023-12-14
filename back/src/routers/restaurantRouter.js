import { Router } from "express"

import * as restaurantController from "../controllers/restaurantController.js";

export const router = Router();

router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/restaurants/:id', restaurantController.getOneRestaurant);
router.post('/restaurants', restaurantController.createdRestaurant);
router.patch('/restaurants/:id', restaurantController.updatedRestaurant);
router.delete('/restaurants/:id', restaurantController.deletedRestaurant)