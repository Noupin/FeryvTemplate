import { Inject, Service } from "typedi";
import { GroupModel } from "../models/GroupModel";
import { GroupRepository } from "../repositories/GroupRepository";
import { CreateGroupRequest } from "../dtos/CreateGroupRequest";
import { PutGroupRequest } from "../dtos/PutGroupRequest";

@Service()
export class GroupService {
  constructor(@Inject() private groupRepository: GroupRepository) {}

  async createGroup(groupData: CreateGroupRequest): Promise<GroupModel> {
    const newGroup = new GroupModel();
    newGroup.name = groupData.name;
    newGroup.description = groupData.description;
    // ... other group properties as needed

    return await this.groupRepository.create(newGroup);
  }

  async getGroup(groupId: string): Promise<GroupModel | null> {
    return await this.groupRepository.findOne(groupId);
    // return new Promise((resolve, reject) => {
    //   // Simulating an asynchronous operation
    //   setTimeout(() => {
    //     console.log("getGroup() called");
    //     const group = new GroupModel();
    //     group.id = 1;
    //     group.name = "group1";
    //     group.description = "group1 description";
    //     group.createdAt = new Date();
    //     group.updatedAt = new Date();

    //     resolve(group);
    //   }, 1000); // Simulating a delay of 1 second
    // });
  }

  async getAllGroups(): Promise<GroupModel[] | null> {
    return await this.groupRepository.findAll();
  }

  async updateGroup(
    groupId: string,
    groupData: PutGroupRequest
  ): Promise<GroupModel | null> {
    const updateData = {
      name: groupData.name,
      description: groupData.description,
      // ... other update properties as needed
    };
    return await this.groupRepository.update(groupId, updateData);
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    return await this.groupRepository.delete(groupId);
  }
}
