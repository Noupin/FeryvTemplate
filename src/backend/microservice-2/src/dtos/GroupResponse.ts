import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { BaseResponse } from "./BaseResponse";
import { GroupModel } from "../models/GroupModel";

export class GroupResponse extends BaseResponse {
  @ValidateNested()
  @Type(() => GroupModel)
  group: GroupModel;

  constructor(group: GroupModel, message: string) {
    super("success", message);
    this.group = group;
  }
}
