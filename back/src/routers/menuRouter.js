import { Router } from "express"

import * as menuController from "../controllers/menuController.js";

export const router = Router();

router.get('/menus', menuController.getAllMenus);
router.get('/menus/:id', menuController.getOneMenu);