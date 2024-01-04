import { Router } from "express";
import validateMliddlewareFactory from "../../middlewares/validate.mliddleware.factory.js";
import postUser from "../../middlewares/schemas/postUser.js";
import patchUser from "../../middlewares/schemas/patchUser.js";

import * as userController from "../controllers/userController.js";

export const router = Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getOneUser);
router.post('/users', validateMliddlewareFactory('body', postUser), userController.createdUser);
router.patch('/users/:id', validateMliddlewareFactory('body', patchUser), userController.updatedUser);
router.delete('/users/:id', userController.deletedUser);