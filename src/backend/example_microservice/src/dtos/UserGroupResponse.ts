import { ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { BaseResponse } from "./BaseResponse";
import { UserModel } from "feryv-identity-user-manager/src/models/UserModel";

export class UserGroupResponse extends BaseResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserModel)
  users!: UserModel; // This is so the OAS picks up the correct type of the List

  constructor(users: UserModel[], message: string) {
    super("success", message);
    // @ts-ignore
    this.users = users;
  }
}
