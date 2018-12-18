import { IUser } from './IUser'

// TODO: Refactor this interface to allow each concrete class to provide their own assumptions about keys on the model
// export interface IScopeableObject {
//   readAcl: string | null;
//   writeAcl: string | null;
//   id: number;
//   tableName: string;
// }

export enum ScopeAction {
  Read,
  Write,
}

export interface IKnexObject {
  _knex: any
}

export abstract class Scope {
  public abstract get aclString(): string

  public abstract testAccess(user: IUser, object: any): Promise<boolean>

  public updateQueryReadAcl(user: IUser, object: any) {
    const knexableObject = object as any
    if (knexableObject._knex === undefined) {
      return Promise.reject({ code: 500, error: 'No _knex found on object: ' + JSON.stringify(knexableObject) })
    }
    if (user && user.isAdmin()) {
      return Promise.resolve()
    } else {
      return this.updateKnexQuery(user, knexableObject)
    }
  }

  protected abstract updateKnexQuery(user: IUser, object: IKnexObject): Promise<any>
}
