import { IsOptional, IsString } from "class-validator";

export class PutGroupRequest {
  @IsString()
  name?: string;

  @IsString()
  description?: string;
}
