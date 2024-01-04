import { Router } from "express";
import validateMliddlewareFactory from "../../middlewares/validate.mliddleware.factory.js";
import postMenu from "../../middlewares/schemas/postMenu.js";
import patchMenu from "../../middlewares/schemas/patchMenu.js";

import * as menuController from "../controllers/menuController.js";

export const router = Router();

router.get('/menus', menuController.getAllMenus);
router.get('/menus/:id', menuController.getOneMenu);
router.post('/menus', validateMliddlewareFactory('body', postMenu), menuController.createdMenu);
router.patch('/menus/:id', validateMliddlewareFactory('body', patchMenu), menuController.updatedMenu);
router.delete('/menus/:id', menuController.deletedMenu);