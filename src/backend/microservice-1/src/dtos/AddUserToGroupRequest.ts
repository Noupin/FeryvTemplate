import { IsString, IsNotEmpty } from "class-validator";

export class AddUserToGroupRequest {
  @IsString()
  @IsNotEmpty()
  userId!: string;
}
