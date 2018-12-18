import { IUser } from './IUser'
import { IKnexObject, Scope } from './Scope'

export class PublicScope extends Scope {
  public aclString = 'public'

  public testAccess(user: IUser, object: any) {
    return Promise.resolve(true)
  }

  public updateKnexQuery(user: IUser, object: IKnexObject): Promise<any> {
    return Promise.resolve()
  }
}
