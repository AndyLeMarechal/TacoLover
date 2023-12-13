import { readFile } from "node:fs/promises";
import { Router } from "express";



// import { router as boissonRouter } from "./boissonRouter.js";
// import { router as dessertRouter } from "./dessertRouter.js";
import { router as menuRouter } from "./menuRouter.js";
// import { router as platRouter } from "./platRouter.js";
// import { router as restaurantRouter } from "./restaurantRouter.js";
// import { router as tagRouter } from "./tagRouter.js";
// import { router as userRouter } from "./userRouter.js";

export const router = Router();


// Main API routes
// router.use(boissonRouter);
// router.use(dessertRouter);
router.use(menuRouter);
// router.use(platRouter);
// router.use(restaurantRouter);
// router.use(tagRouter);
// router.use(userRouter);



router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found" });
});