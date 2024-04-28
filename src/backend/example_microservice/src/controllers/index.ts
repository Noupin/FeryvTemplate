import { GroupsController } from "./groups";
import { GroupUsersController } from "./groupsUsers";
import { SystemController } from "./system";

export const routingControllersOptions = {
  controllers: [SystemController, GroupsController, GroupUsersController],
};
