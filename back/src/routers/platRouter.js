import { Router } from "express";

import * as platController from "../controllers/platController.js";

export const router = Router();

router.get('/plats', platController.getAllPlats);
router.get('/plats/:id', platController.getOnePlat);
router.post('/plats', platController.createdPlat);
router.patch('/plats/:id', platController.updatedPlat);
router.delete('/plats/:id', platController.deletedPlat);