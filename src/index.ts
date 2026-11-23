import "dotenv/config";
import express, { Request, Response } from "express";
import { logger } from "./middleware/logger.middleware";
import routes from "./routes/index.routes";
import { errorHandler } from "./middleware/error-handler.middleware";

// Constants
const app = express();

app.use(express.json());
app.use(logger);
app.use("/", routes);
app.use(errorHandler);

// Listen
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/`);
  console.log(`app listening on port ${process.env.PORT}`);
});
