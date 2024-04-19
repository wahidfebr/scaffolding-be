import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { Column, Model, Table, BeforeUpdate } from "sequelize-typescript";
import { EUserSsoType, IUser } from "@/user/entity/user.entity";

@Table({
  tableName: "users",
  modelName: "user",
  underscored: true,
  paranoid: true,
})
export class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements IUser
{
  @Column({
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  id: CreationOptional<string>;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataTypes.STRING,
  })
  password: CreationOptional<string | null>;

  @Column({
    type: DataTypes.DATE,
  })
  passwordUpdatedAt: CreationOptional<Date | null>;

  @Column({
    type: DataTypes.STRING
  })
  imagePath: CreationOptional<string | null>;

  @Column({
    type: DataTypes.ENUM(...Object.values(EUserSsoType)),
  })
  ssoType: CreationOptional<string | null>;

  @BeforeUpdate
  static generatePasswordUpdatedAt(user: User) {
    if (user.changed("password")) {
      user.passwordUpdatedAt = new Date();
    }
  }
}
