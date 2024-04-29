import { IsString, IsDate } from "class-validator";

// BaseResponseModel.ts
export class BaseResponse {
  @IsString()
  status: string;
  @IsString()
  message: string;
  @IsDate()
  timestamp: Date;

  constructor(status: string, message: string, timestamp: Date = new Date()) {
    this.status = status;
    this.message = message;
    this.timestamp = timestamp;
  }
}
