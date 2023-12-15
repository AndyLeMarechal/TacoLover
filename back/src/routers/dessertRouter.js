import { Router } from "express";

import * as dessertController from "../controllers/dessertController.js";

export const router = Router();

router.get('/desserts', dessertController.getAllDesserts);
router.get('/desserts/:id', dessertController.getOneDessert);
router.post('/desserts', dessertController.createdDessert);
router.patch('/desserts/:id', dessertController.updatedDessert);
router.delete('/desserts/:id', dessertController.deletedDessert);