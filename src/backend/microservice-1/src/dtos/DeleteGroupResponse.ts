import { IsNumber } from "class-validator";
import { BaseResponse } from "./BaseResponse";

export class DeleteGroupResponse extends BaseResponse {
  @IsNumber()
  id: number;

  constructor(id: number, message: string) {
    super("success", message);
    this.id = id;
  }
}
