import { Router } from "express"

import * as tagController from "../controllers/tagController.js";

export const router = Router();

router.get('/tags', tagController.getAllTags);
router.get('/tags/:id', tagController.getOneTag);
router.post('/tags', tagController.createdTag);
router.patch('/tags/:id', tagController.updatedTag);
router.delete('/tags/:id', tagController.deletedTag);