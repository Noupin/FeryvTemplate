import { Inject, Service } from "typedi";
import { GroupModel } from "../models/GroupModel";
import { AppDataSource } from ".";
import { UserModel } from "feryv-identity-user-manager/src/models/UserModel";
import { BaseRepository } from "feryv-identity-common/src/BaseRepository";

@Service()
export class GroupRepository extends BaseRepository<GroupModel> {
  constructor() {
    super(AppDataSource, GroupModel);
  }

  async addUser(groupId: number, userId: number): Promise<UserModel[]> {
    // const group = await this.findOne(groupId);
    // const user = await this.userRepository.findOne(userId);
    // if (group && user) {
    //   group.users.push(user);
    //   await group.save();
    // }
    // return group?.users ?? [];
    return [];
  }

  async removeUser(groupId: number, userId: number): Promise<void> {
    // const group = await this.findOne(groupId);
    // const user = await this.userRepository.findOne(userId);
    // if (group && user) {
    //   group.users = group.users.filter((u) => u.id !== user.id);
    //   await group.save();
    // }
  }

  async listUsers(groupId: number): Promise<UserModel[]> {
    // const group = await this.findOne(groupId);
    // if (group) {
    //   return group.users;
    // }
    // return [];
    return [];
  }
}
