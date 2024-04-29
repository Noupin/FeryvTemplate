// HealthCheckResponseModel.ts
import { BaseResponse } from "./BaseResponse";

export class HealthCheckResponse extends BaseResponse {
  constructor() {
    super("success", "Service is operational");
  }
}
