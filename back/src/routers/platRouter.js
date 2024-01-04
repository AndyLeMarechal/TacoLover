import { Router } from "express";
import validateMliddlewareFactory from "../../middlewares/validate.mliddleware.factory.js";
import postPlat from "../../middlewares/schemas/postPlat.js";
import patchPlat from "../../middlewares/schemas/patchPlat.js";

import * as platController from "../controllers/platController.js";

export const router = Router();

router.get('/plats', platController.getAllPlats);
router.get('/plats/:id', platController.getOnePlat);
router.post('/plats', validateMliddlewareFactory('body', postPlat), platController.createdPlat);
router.patch('/plats/:id', validateMliddlewareFactory('body', patchPlat), platController.updatedPlat);
router.delete('/plats/:id', platController.deletedPlat);