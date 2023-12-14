import { Router } from "express"

import * as menuController from "../controllers/menuController.js";

export const router = Router();

router.get('/menus', menuController.getAllMenus);
router.get('/menus/:id', menuController.getOneMenu);
router.post('/menus', menuController.createdMenu);
router.patch('/menus/:id', menuController.updatedMenu);
router.delete('/menus/:id', menuController.deletedMenu)