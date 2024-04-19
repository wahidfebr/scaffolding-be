import { v4 as uuidv4 } from "uuid";

export interface IBaseEntityProperty {
  id?: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  deletedAt?: Date | undefined | null;
}

export interface DefaultEntityBehaviour<I> {
  unmarshal(): I;
}

const isInstance = <T>(v: BaseEntity<T>): v is BaseEntity<T> => {
  return v instanceof BaseEntity;
};

export abstract class BaseEntity<T> {
  protected readonly _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : uuidv4();
    this.props = props;
  }

  public equals(object?: BaseEntity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isInstance(object)) {
      return false;
    }
    return this._id == object._id;
  }
}
