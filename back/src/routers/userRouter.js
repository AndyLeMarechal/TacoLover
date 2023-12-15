import { Router } from "express";

import * as userController from "../controllers/userController.js";

export const router = Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getOneUser);
router.post('/users', userController.createdUser);
router.patch('/users/:id', userController.updatedUser);
router.delete('/users/:id', userController.deletedUser);