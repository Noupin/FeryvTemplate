import {
  JsonController,
  Post,
  Delete,
  Get,
  Param,
  Body,
  Res,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { Response } from "express";
import { AddUserToGroupRequest } from "../dtos/AddUserToGroupRequest";
import { BaseResponse } from "../dtos/BaseResponse";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GroupUserService } from "../services/groupsUsersService";
import { UserGroupResponse } from "../dtos/UserGroupResponse";

@JsonController("/groups/:groupId/users")
@Service()
export class GroupUsersController {
  constructor(@Inject() private groupUserService: GroupUserService) {}

  @Post()
  @ResponseSchema(UserGroupResponse, { statusCode: 201 })
  @OpenAPI({ description: "Add a user to a group" })
  async addUserToGroup(
    @Param("groupId") groupId: string,
    @Body() userDetails: AddUserToGroupRequest,
    @Res() res: Response
  ) {
    const addUserResult = await this.groupUserService.addUserToGroup(
      groupId,
      userDetails
    );
    return res
      .status(201)
      .json(
        new UserGroupResponse(addUserResult, "User added to group successfully")
      );
  }

  @Delete("/:userId")
  @ResponseSchema(BaseResponse, { statusCode: 204 })
  @ResponseSchema(BaseResponse, { statusCode: 404 })
  @OpenAPI({ description: "Remove a user from a group" })
  async removeUserFromGroup(
    @Param("groupId") groupId: string,
    @Param("userId") userId: string,
    @Res() res: Response
  ) {
    const removeUserResult = await this.groupUserService.removeUserFromGroup(
      groupId,
      userId
    );
    return removeUserResult
      ? res
          .status(204)
          .json(
            new BaseResponse("success", "User removed from group successfully")
          )
      : res
          .status(404)
          .json(new BaseResponse("error", "User or group not found"));
  }

  @Get()
  @ResponseSchema(UserGroupResponse, { statusCode: 200 })
  @OpenAPI({ description: "List all users in a group" })
  async listUsersInGroup(
    @Param("groupId") groupId: string,
    @Res() res: Response
  ) {
    const users = await this.groupUserService.listUsersInGroup(groupId);
    return res
      .status(200)
      .json(
        new UserGroupResponse(users, "Users in group fetched successfully")
      );
  }
}
