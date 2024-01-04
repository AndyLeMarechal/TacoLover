import { Router } from "express";
import validateMliddlewareFactory from "../../middlewares/validate.mliddleware.factory.js";
import postDrink from "../../middlewares/schemas/postDrink.js";
import patchDrink from "../../middlewares/schemas/patchDrink.js";

import * as drinkController from "../controllers/drinkController.js";

export const router = Router();

router.get('/drinks', drinkController.getAllDrinks);
router.get('/drinks/:id', drinkController.getOneDrink);
router.post('/drinks', validateMliddlewareFactory('body', postDrink), drinkController.createdDrink);
router.patch('/drinks/:id', validateMliddlewareFactory('body', patchDrink), drinkController.updatedDrink);
router.delete('/drinks/:id', drinkController.deletedDrink);