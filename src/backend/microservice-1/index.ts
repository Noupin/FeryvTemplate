//Third Party Modules
import "reflect-metadata";
import {
  createExpressServer,
  useContainer as routingUseContainer,
} from "routing-controllers";
import swaggerUi from "swagger-ui-express";
import { Request, Response } from "express";
import path from "path";
import { Container } from "typedi";

//First Party Modules
import { routingControllersOptions } from "./controllers";
import { oasSpec } from "./middleware/oas";
import { requestLoggerMiddleware } from "./middleware/endpointLogging";
import { AppDataSource } from "./repositories";

routingUseContainer(Container);

// Initialize Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initialized");

    // Add Controllers to Express Server
    const app = createExpressServer(routingControllersOptions);

    // Add Swagger UI to Express Server
    app.use("/oas-ui", swaggerUi.serve, swaggerUi.setup(oasSpec));
    app.get("/oas", (req: Request, res: Response) => {
      res.type("json");
      res.sendFile(path.join(__dirname, "assets", "openapi-spec.json"));
    });

    // Add endpoint logging to Express Server
    app.use(requestLoggerMiddleware);

    // Start Express Server
    const port = process.env.PORT || 3004;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) =>
    console.error("Error during Data Source initialization", error)
  );
