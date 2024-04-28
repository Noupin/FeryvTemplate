import { IsString, IsNotEmpty } from "class-validator";

export class CreateGroupRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  description?: string;
}
