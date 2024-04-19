import {
  BaseEntity,
  DefaultEntityBehaviour,
  IBaseEntityProperty,
} from "@/common/base.entity";
import { CryptoHelper } from "@/common/helpers/crypto.helper";

export enum EUserSsoType {
  Google = "Google",
  Github = "Github",
}

export interface IUser extends IBaseEntityProperty {
  email: string;
  username: string;
  password?: string | undefined | null;
  passwordUpdatedAt?: Date | undefined | null;
  ssoType?: string | EUserSsoType | undefined | null;
  imagePath?: string | undefined | null;
  passwordUpdateRelativeTime?: string | undefined;
}

export class User
  extends BaseEntity<IUser>
  implements DefaultEntityBehaviour<IUser>
{
  private constructor(props: IUser) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: IUser): User {
    return new User(props);
  }

  public unmarshal(): IUser {
    return {
      id: this._id,
      email: this.email,
      username: this.username,
      password: this.password,
      passwordUpdatedAt: this.passwordUpdatedAt,
      ssoType: this.ssoType,
      imagePath: this.imagePath,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      passwordUpdateRelativeTime: this.passwordUpdateRelativeTime,
    };
  }

  public async setPassword(val: string | undefined | null): Promise<void> {
    if (val && val !== "") {
      this.props.password = await CryptoHelper.hashPassword(val);
    } else if (val === null) {
      this.props.password = null;
    } else {
      throw new Error("Invalid password");
    }
  }

  public async verifyPassword(password: string): Promise<boolean> {
    if (this.password) {
      return await CryptoHelper.verifyPassword(this.password, password);
    }
    return false;
  }

  get id(): string {
    return this._id;
  }
  get email(): string {
    return this.props.email;
  }
  get username(): string {
    return this.props.username;
  }
  get password(): string | undefined | null {
    return this.props.password;
  }
  get passwordUpdatedAt(): Date | undefined | null {
    return this.props.passwordUpdatedAt;
  }
  get ssoType(): string | EUserSsoType | undefined | null {
    return this.props.ssoType;
  }
  get imagePath(): string | undefined | null {
    return this.props.imagePath;
  }
  set imagePath(val: string | undefined | null) {
    this.props.imagePath = val;
  }
  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }
  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
  get deletedAt(): Date | undefined | null {
    return this.props.deletedAt;
  }
  get passwordUpdateRelativeTime(): string | undefined {
    return this.props.passwordUpdateRelativeTime;
  }
}
