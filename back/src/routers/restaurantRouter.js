import { Router } from "express";
import validateMliddlewareFactory from "../../middlewares/validate.mliddleware.factory.js";
import postRestaurant from "../../middlewares/schemas/postRestaurant.js";
import patchRestaurant from "../../middlewares/schemas/patchRestaurant.js";


import * as restaurantController from "../controllers/restaurantController.js";

export const router = Router();

router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/restaurants/:id', restaurantController.getOneRestaurant);
router.post('/restaurants', validateMliddlewareFactory('body', postRestaurant), restaurantController.createdRestaurant);
router.patch('/restaurants/:id', validateMliddlewareFactory('body', patchRestaurant), restaurantController.updatedRestaurant);
router.delete('/restaurants/:id', restaurantController.deletedRestaurant);