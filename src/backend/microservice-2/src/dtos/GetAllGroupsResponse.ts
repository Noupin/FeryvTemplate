import { ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { BaseResponse } from "./BaseResponse";
import { GroupModel } from "../models/GroupModel";

export class GetAllGroupsResponse extends BaseResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupModel)
  groups: GroupModel; // This is so the OAS picks up the correct type of the List

  constructor(groups: GroupModel[], message: string) {
    super("success", message);
    // @ts-ignore
    this.groups = groups;
  }
}
