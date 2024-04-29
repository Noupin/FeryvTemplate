import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserGroupModel } from "./UserGroupModel";
import { IdentifiableEntity } from "feryv-identity-common/src/IdentifiableEntity";

@Entity()
export class GroupModel extends IdentifiableEntity {
  @Column({ length: 100 })
  @IsString()
  name!: string;

  @Column({ type: "text", nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @CreateDateColumn()
  @IsDate()
  createdAt!: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt!: Date;

  @OneToMany(() => UserGroupModel, (userGroup) => userGroup.group)
  userGroups!: UserGroupModel[];
}
