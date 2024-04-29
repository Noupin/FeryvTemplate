import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { GroupModel } from "./GroupModel";
import { IsNumber } from "class-validator";
import { IdentifiableEntity } from "feryv-identity-common/src/IdentifiableEntity";

@Entity()
export class UserGroupModel extends IdentifiableEntity {
  @Column()
  @IsNumber()
  userId!: number; // Assuming user ID is a number

  @ManyToOne(() => GroupModel, (group) => group.userGroups)
  @JoinColumn({ name: "groupId" })
  group!: GroupModel;
}
