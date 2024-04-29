import {
  JsonController,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Res,
  Patch,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { Response } from "express";
import { CreateGroupRequest } from "../dtos/CreateGroupRequest";
import { PutGroupRequest } from "../dtos/PutGroupRequest";
import { BaseResponse } from "../dtos/BaseResponse";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GroupService } from "../services/groupsService";
import { GetAllGroupsResponse } from "../dtos/GetAllGroupsResponse";
import { GroupResponse } from "../dtos/GroupResponse";
import { DeleteGroupResponse } from "../dtos/DeleteGroupResponse";
import { PatchGroupRequest } from "../dtos/PatchGroupRequest copy";

@JsonController("/groups")
@Service()
export class GroupsController {
  constructor(@Inject() private groupService: GroupService) {}

  @Post()
  @ResponseSchema(GroupResponse, { statusCode: 201 })
  @OpenAPI({ description: "Create a new group" })
  async createGroup(
    @Body() groupDetails: CreateGroupRequest,
    @Res() res: Response
  ) {
    const group = await this.groupService.createGroup(groupDetails);
    return res
      .status(201)
      .json(
        new GroupResponse(
          group,
          `Group '${groupDetails.name}' created successfully`
        )
      );
  }

  @Get()
  @ResponseSchema(GetAllGroupsResponse, { statusCode: 200 })
  @OpenAPI({ description: "Get all groups" })
  async getAllGroups() {
    const groups = await this.groupService.getAllGroups();
    return new GetAllGroupsResponse(groups!, "Groups fetched successfully");
  }

  @Get("/:id")
  @ResponseSchema(GroupResponse, { statusCode: 200 })
  @ResponseSchema(BaseResponse, { statusCode: 404 })
  @OpenAPI({ description: "Get a single group by ID" })
  async getGroup(@Param("id") id: string, @Res() res: Response) {
    const group = await this.groupService.getGroup(id);
    return group
      ? new GroupResponse(group, "Group fetched successfully")
      : res.status(404).json(new BaseResponse("error", "Group not found"));
  }

  @Put("/:id")
  @ResponseSchema(GroupResponse, { statusCode: 201 })
  @ResponseSchema(BaseResponse, { statusCode: 404 })
  @OpenAPI({ description: "Update a single group by ID" })
  async updateGroup(
    @Param("id") id: string,
    @Body() groupDetails: PutGroupRequest,
    @Res() res: Response
  ) {
    const updatedGroup = await this.groupService.updateGroup(id, groupDetails);
    return updatedGroup
      ? res
          .status(201)
          .json(
            new GroupResponse(
              updatedGroup,
              `Group '${id}' updated successfully`
            )
          )
      : res.status(404).json(new BaseResponse("error", "Group not found"));
  }

  @Patch("/:id")
  @ResponseSchema(GroupResponse, { statusCode: 200 })
  @ResponseSchema(BaseResponse, { statusCode: 404 })
  @OpenAPI({ description: "Update a single group by ID" })
  async patchGroup(
    @Param("id") id: string,
    @Body() groupDetails: PatchGroupRequest,
    @Res() res: Response
  ) {
    const updatedGroup = await this.groupService.updateGroup(id, groupDetails);
    return updatedGroup
      ? res
          .status(200)
          .json(
            new GroupResponse(
              updatedGroup,
              `Group '${id}' updated successfully`
            )
          )
      : res.status(404).json(new BaseResponse("error", "Group not found"));
  }

  @Delete("/:id")
  @ResponseSchema(DeleteGroupResponse, { statusCode: 204 })
  @ResponseSchema(BaseResponse, { statusCode: 404 })
  @OpenAPI({ description: "Delete a single group by ID" })
  async deleteGroup(@Param("id") id: string, @Res() res: Response) {
    const deleted = await this.groupService.deleteGroup(id);
    return deleted
      ? res
          .status(204)
          .json(
            new DeleteGroupResponse(
              Number.parseInt(id),
              `Group '${id}' deleted successfully`
            )
          )
      : res.status(404).json(new BaseResponse("error", "Group not found"));
  }
}
