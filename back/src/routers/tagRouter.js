import { Router } from "express";
import validateMliddlewareFactory from "../../middlewares/validate.mliddleware.factory.js";
import postTag from "../../middlewares/schemas/postTag.js";
import patchTag from "../../middlewares/schemas/patchTag.js";

import * as tagController from "../controllers/tagController.js";

export const router = Router();

router.get('/tags', tagController.getAllTags);
router.get('/tags/:id', tagController.getOneTag);
router.post('/tags', validateMliddlewareFactory('body', postTag), tagController.createdTag);
router.patch('/tags/:id', validateMliddlewareFactory('body', patchTag), tagController.updatedTag);
router.delete('/tags/:id', tagController.deletedTag);