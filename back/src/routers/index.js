
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { readFile } from "node:fs/promises";



import { router as drinkRouter } from "./drinkRouter.js";
import { router as dessertRouter } from "./dessertRouter.js";
import { router as menuRouter } from "./menuRouter.js";
import { router as platRouter } from "./platRouter.js";
import { router as restaurantRouter } from "./restaurantRouter.js";
import { router as tagRouter } from "./tagRouter.js";
import { router as userRouter } from "./userRouter.js";

export const router = Router();


// Main API routes
router.use(drinkRouter);
router.use(dessertRouter);
router.use(menuRouter);
router.use(platRouter);
router.use(restaurantRouter);
router.use(tagRouter);
router.use(userRouter);

// Ajout de la route de documentation Swagger
const swaggerDocument = JSON.parse(await readFile(new URL("./swagger.json", import.meta.url))); // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found" });
});