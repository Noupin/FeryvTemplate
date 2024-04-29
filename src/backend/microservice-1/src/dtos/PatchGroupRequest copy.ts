import { IsOptional, IsString } from "class-validator";

export class PatchGroupRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
