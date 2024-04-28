import { Service, Inject } from "typedi";
import { GroupRepository } from "../repositories/GroupRepository";
import { UserModel } from "feryv-identity-user-manager/src/models/UserModel";

@Service()
export class GroupUserService {
  constructor(@Inject() private groupRepository: GroupRepository) {}

  async removeUserFromGroup(groupId: string, userId: string): Promise<boolean> {
    // Convert groupId and userId to number
    // Call groupUserRepository.removeUserFromGroup()
    // Handle business logic and return appropriate response
    const convertedGroupId = Number(groupId);
    const convertedUserId = Number(userId);
    try {
      await this.groupRepository.removeUser(convertedGroupId, convertedUserId);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async listUsersInGroup(groupId: string): Promise<UserModel[]> {
    // Convert groupId to number
    // Call groupUserRepository.listUsersInGroup()
    // Handle business logic and return appropriate response
    const convertedGroupId = Number(groupId);
    const users = await this.groupRepository.listUsers(convertedGroupId);
    console.log(users);
    // Handle business logic and return appropriate response
    return users;
  }

  async addUserToGroup(
    groupId: string,
    userDetails: any
  ): Promise<UserModel[]> {
    // Convert groupId to number and extract userId from userDetails
    // Call groupUserRepository.addUserToGroup()
    // Handle business logic and return appropriate response
    const convertedGroupId = Number(groupId);
    const userId = userDetails.userId;
    return await this.groupRepository.addUser(convertedGroupId, userId);
    // Handle business logic and return appropriate response
  }
}
