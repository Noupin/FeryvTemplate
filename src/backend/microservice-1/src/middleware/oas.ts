//Third Party Modules
import "reflect-metadata";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as oa from "openapi3-ts";
import fs from "fs";
import path from "path";

//First Party Modules
import { routingControllersOptions } from "../controllers";

const schemas = validationMetadatasToSchemas({
  refPointerPrefix: "#/components/schemas/",
}) as { [schema: string]: oa.SchemaObject };

const storage = getMetadataArgsStorage();
export const oasSpec = routingControllersToSpec(
  storage,
  routingControllersOptions,
  {
    components: {
      schemas,
      // Add additional components like security definitions here
    },
    info: {
      description: "This is the Feryv Identity Group Manager API Documentation",
      title: "Feryv Identity - Group Manager",
      version: "1.0.0",
    },
  }
);
fs.writeFileSync(
  path.join("src", "assets", "openapi-spec.json"),
  JSON.stringify(oasSpec, null, 2)
);
