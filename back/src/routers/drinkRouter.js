import { Router } from "express";

import * as drinkController from "../controllers/drinkController.js";

export const router = Router();

router.get('/drinks', drinkController.getAllDrinks);
router.get('/drinks/:id', drinkController.getOneDrink);
router.post('/drinks', drinkController.createdDrink);
router.patch('/drinks/:id', drinkController.updatedDrink);
router.delete('/drinks/:id', drinkController.deletedDrink);