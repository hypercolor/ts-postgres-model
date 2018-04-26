

// import * as Bookshelf from 'bookshelf';
import * as Knex from 'knex';

import * as Bookshelf from 'bookshelf';

export const bookshelf = Bookshelf(Knex({client: 'postgresql'}));

import * as BlueBird from 'bluebird';
import {Collection, DestroyOptions, FetchAllOptions, FetchOptions, Model, SaveOptions} from 'bookshelf';

import * as Pluralize from 'pluralize';
// import {Postgres} from '../../src/interfaces/postgres';
import { IScopeFactory } from './IScopeFactory';
import { IUser } from './IUser';
import { Scope, ScopeAction } from './Scope';

// import {Postgres} from '../../interfaces/postgres';
// import {
//   IFetchPageOptions, PaginatedBookshelf, PaginatedCollection,
//   PaginatedModel
// } from '../../../types/bookshelf-pagination/index';
// import {PaginatedBookshelf} from 'bookshelf-pagination';

// import {Scope, ScopeAction} from '../../util/access-control/scope';
// import {ScopeFactory} from '../../util/access-control/scope-factory';
// import {IAuthRequest} from '../../util/auth';

// import {AccessControl} from "../../util/access_control";

export interface IPostgresModelClass<T extends PostgresModel<T>> {
  instanceName: string;
  pluralInstanceName: string;
  relationships: object;
  new(params?: any): T;
}

export interface IPaginationMetadata {
  rowCount: number, // Total number of rows found for the query before pagination
  pageCount: number, // Total number of pages of results
  page: number, // The requested page number
  pageSze: number, // The requested number of rows per page
}

export interface IFetchPageOptions {
  pageSize: number,
  page: number,
  withRelated?: Array<string>
}

export interface IPaginatedCollection<T extends Model<any>> extends Collection<T> {
  pagination: IPaginationMetadata;
}

// declare namespace PaginatedBookshelf {
//
//
//
//
//
//   export class PaginatedModel<T extends Model<any>> extends Model<T> {
//
//     public fetchPage(options?: IFetchPageOptions): Bluebird<PaginatedCollection<T>>;
//
//   }
//
// }

export class PostgresModelScopeFactory {
  public static scopeFactory: IScopeFactory;
}


export abstract class PostgresModel<T extends Model<T>> extends bookshelf.Model<T> {

  // ==============================
  //  Model Configuration
  // ==============================

  // note: tableName must be implemented as a getter fcn not a property on the concrete classes for eager loading to work
  abstract get tableName(): string;
  // abstract get defaultReadAcl(): string;
  // abstract get defaultWriteAcl(): string;

  // abstract get columns(): object;
  get readOnlyColumns(): Array<string> {
    return [];
  }


  public abstract defaultReadAclScope: Scope;
  public abstract defaultWriteAclScope: Scope;


  static get instanceName(): string {
    return this.name.charAt(0).toLowerCase() + this.name.slice(1);
  }

  static get pluralInstanceName(): string {
    return Pluralize(this.instanceName);
  }

  get hasTimestamps(): boolean { return true; }

  // ==============================
  //  Constructor
  // ==============================
  // ==============================
  //  Relationships
  // ==============================
  // ==============================
  //  Eager loading accessors
  // ==============================
  // ==============================
  //  Column getter/setters
  // ==============================

  // get createdAt(): Date { return this.get('created_at'); }
  // get updatedAt(): Date { return this.get('updated_at'); }
  //
  get readAcl(): string | null { return this.get('readAcl'); }
  set readAcl(value: string | null) { this.set('readAcl', value); }

  get writeAcl(): string | null { return this.get('writeAcl'); }
  set writeAcl(value: string | null) { this.set('writeAcl', value); }
  //
  // get deleted(): boolean { return this.get('deleted') || false; }
  // set deleted(value: boolean) { this.set('deleted',value); }
  //
  // get userId(): number | null { return this.get('userId'); }
  // set userId(value: number | null) { this.set('userId',value); }
  //
  // get companyId(): number | null { return this.get('companyId'); }
  // set companyId(value: number | null) { this.set('companyId',value); }

  // ==============================
  //  Business Logic
  // ==============================

  public willBeUpdated(newParams: any): Promise<any> {
    return Promise.resolve(newParams);
  }

  public updateWithParams(params: any, user: IUser, options?: SaveOptions): Promise<T> {
    const restrictedKeys = [
      'id',
      'readAcl',
      'writeAcl'
    ].concat(this.readOnlyColumns);
    return this.willBeUpdated(params)
    .then(updatedParams => {
      Object.keys(updatedParams).forEach(key => {
        if (restrictedKeys.indexOf(key) === -1) {
          this.set(key, updatedParams[key]);
        }
      });
      return this.saveForUser(user, options);
    });
  }

  // ==============================
  //  Access Control
  // ==============================


  public get readAclScope(): Scope {
    if (this.readAcl){
      return PostgresModelScopeFactory.scopeFactory.scopeForAcl(this.readAcl, ScopeAction.Read);
    } else {
      return this.defaultReadAclScope;
    }
  }

  public get writeAclScope(): Scope {
    if (this.writeAcl){
      return PostgresModelScopeFactory.scopeFactory.scopeForAcl(this.writeAcl, ScopeAction.Write);
    } else {
      return this.defaultWriteAclScope;
    }
  }

  public save(attrs?: { [key: string]: any }, options?: SaveOptions): BlueBird<T>;
  public save(key?: string, val?: any, options?: SaveOptions): BlueBird<T>;
  public save(){
    return BlueBird.reject({code: 500, error: 'Must use saveForUser.'});
  }

  public saveForUser(user: IUser, options?: SaveOptions): Promise<T> {

    return new Promise<boolean>((resolve,reject) => {
      if (this.id === undefined) {
        // If no id, it must be a new object so we'll just let the save through
        resolve(true);
      } else {
        this.writeAclScope.testAccess(user, this).then(resolve).catch(reject);
        // AccessControl.verifyRequestHasPermissionToWriteObject(req,this).then(resolve).catch(reject);
      }
    })
    .then((allowed) => {
      if (allowed) {
        // return Promise.resolve(this);
        return super.save(undefined, options)
        .then(result => {
          return Promise.resolve(result);
        });
      } else {
        // const companyIds = user !== undefined ? user.getVisibleCompanyIds() : [];
        // console.log('Failed auth test for object: ' + JSON.stringify(this) + ' for user: ' + JSON.stringify(user) + ' with companies: ' + JSON.stringify(companyIds));
        return Promise.reject({code: 403, error: 'User not authorized for that action.'});
        // return Promise.reject(new Error(''));
      }
    });
  }

  public saveIgnoringWriteAcl(key?: string, val?: any, options?: SaveOptions): Promise<T> {
    return Promise.resolve().then(() => {
      return super.save(key, val, options);
    });
  }

  public destroy(options?: DestroyOptions): BlueBird<T> {
    return BlueBird.reject({code: 500, error: 'Must use destroyForUser.'});
  }

  public destroyForUser(user: IUser, options?: DestroyOptions): Promise<any> {

    return this.writeAclScope.testAccess(user, this)
    // return AccessControl.verifyRequestHasPermissionToWriteObject(req,this)
    .then((allowed) => {
      if (allowed) {
        return super.destroy(options);
      } else {
        return Promise.reject({code: 403, error: 'User not authorized for that action.'});
      }
    });
  }

  public fetch(fetchOptions?: FetchOptions){
    return BlueBird.reject({code: 500, error: new Error('Must use fetchForUser.')});
  }

  public fetchForUser(user: IUser, fetchOptions?: any): Promise<T> {

    let result: T;
    return Promise.resolve().then(() => {
      return super.fetch(fetchOptions);
    })
    .then(r => {
      result = r as any;
      if (result){
        return this.readAclScope.testAccess(user, result as any);
      } else {
        return Promise.resolve(true);
      }
      // return AccessControl.testObjectReadAuthorizationForRequest(result,req);
    })
    .then((authorized) => {
      if (authorized) {
        return Promise.resolve(result);
      } else {
        console.log('Unauthorized for read access to object: ' + JSON.stringify(result));
        console.log('');
        console.log(' for user: ' + JSON.stringify(user));
        return Promise.reject({code: 403, error: 'Unauthorized.'});
      }
    });
  }

  public fetchIgnoringReadAcl(fetchOptions?: any): Promise<T> {
    return Promise.resolve().then(() => {
      return super.fetch(fetchOptions);
    });
  }

  // public fetchAll(fetchOptions?: FetchAllOptions){
  //   const unlock = fetchOptions ? (fetchOptions as any).unlock : null;
  //   if (unlock){
  //     return super.fetchAll(fetchOptions);
  //   } else {
  //     return BlueBird.reject({code: 500, error: new Error('Must use fetchAllForUser.')});
  //   }
  // }

  public fetchAllForUser(user: IUser, fetchOptions?: FetchAllOptions): Promise<Collection<T>> {

    return this.readAclScope.updateQueryReadAcl(user, this)
    .then(() => {
      return super.fetchAll(fetchOptions);
    });
  }

  public fetchPageForUser(user: IUser, options?: IFetchPageOptions): Promise<IPaginatedCollection<T>> {
    return this.readAclScope.updateQueryReadAcl(user, this)
    .then(() => {
      return (this as any).fetchPage(options);
    });
  }

  public fetchAllIgnoringReadAcl(fetchOptions?: FetchAllOptions): Promise<Collection<T>> {
    return Promise.resolve().then(() => {
      return super.fetchAll(fetchOptions);
    });
  }


}

