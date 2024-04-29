// controllers/system.ts
import { JsonController, Get } from "routing-controllers";
import { ResponseSchema, OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import { HealthCheckResponse } from "../dtos/HealthCheckResponse";
import { BaseResponse } from "../dtos/BaseResponse";

@JsonController("/system")
@Service()
export class SystemController {
  @Get("/health")
  @ResponseSchema(BaseResponse, { statusCode: 200 })
  @OpenAPI({ description: "Check the health of the microservice" })
  healthcheck() {
    return new HealthCheckResponse();
  }
}
