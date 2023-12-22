// Load environnement variables
import "dotenv/config";

// Import NPM dependencies
import express from "express";
import cors from "cors";

// Import local dependencies
import { router as apiRouter } from "./src/routers/index.js";
import { bodySanitizer } from "./middlewares/body-sanitizer.js";

// Create Express App
const app = express();

// Allow some Cross origin requests
app.use(cors({ origin: "*" })); // * = n'importe quel domaine ! Techniquement, il ne faudrait whitelister QUE notre front

// Add body parser
app.use(express.urlencoded({ extended: true })); // Ce body parser est capable de parser les body au format application/x-www-urlencoded (eg, les body envoyé par un <form> HTML)
app.use(express.json()); // Ce body parser parse les body au format application/json


// (BONUS) Generalisation du contrôle des inputs contre les potentielles injections XSS
app.use(bodySanitizer);


// Configure Express app
app.use("/api", apiRouter);

// Start express app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/api/docs`);
});
