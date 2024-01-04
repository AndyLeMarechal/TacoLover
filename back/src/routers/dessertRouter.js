import { Router } from "express";
import validateMliddlewareFactory from "../../middlewares/validate.mliddleware.factory.js";
import postDessert from "../../middlewares/schemas/postDessert.js";
import patchDessert from "../../middlewares/schemas/patchDessert.js";

import * as dessertController from "../controllers/dessertController.js";

export const router = Router();

router.get('/desserts', dessertController.getAllDesserts);
router.get('/desserts/:id', dessertController.getOneDessert);
router.post('/desserts', validateMliddlewareFactory('body', postDessert), dessertController.createdDessert);
router.patch('/desserts/:id',validateMliddlewareFactory('body', patchDessert), dessertController.updatedDessert);
router.delete('/desserts/:id', dessertController.deletedDessert);