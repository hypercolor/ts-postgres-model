// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../bookshelf
//   ../knex

import * as Bookshelf from 'bookshelf';
import { Collection, DestroyOptions, FetchAllOptions, Model, SaveOptions } from 'bookshelf';
import * as Knex from 'knex';

export const bookshelf: Bookshelf;
export interface IPostgresModelClass<T extends PostgresModel<T>> {
    instanceName: string;
    pluralInstanceName: string;
    relationships: object;
    new (params?: any): T;
}
export interface IPaginationMetadata {
    rowCount: number;
    pageCount: number;
    page: number;
    pageSze: number;
}
export interface IFetchPageOptions {
    pageSize: number;
    page: number;
    withRelated?: Array<string>;
}
export interface IPaginatedCollection<T extends Model<any>> extends Collection<T> {
    pagination: IPaginationMetadata;
}
export class PostgresModelScopeFactory {
    static scopeFactory: IScopeFactory;
}
export abstract class PostgresModel<T extends Model<T>> extends bookshelf.Model<T> {
    readonly abstract tableName: string;
    readonly abstract columns: object;
    readonly readOnlyColumns: Array<string>;
    defaultReadAclScope: Scope;
    defaultWriteAclScope: Scope;
    static readonly instanceName: string;
    static readonly pluralInstanceName: string;
    readonly hasTimestamps: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readAcl: string | null;
    writeAcl: string | null;
    deleted: boolean;
    willBeUpdated(newParams: any): Promise<any>;
    updateWithParams(params: any, options?: SaveOptions): Promise<T>;
    updateWithParamsForUser(params: any, user: IUser, options?: SaveOptions): Promise<T>;
    readonly readAclScope: Scope;
    readonly writeAclScope: Scope;
    userHasAccess(user: IUser, scopeAction: ScopeAction): Promise<boolean>;
    saveForUser(user: IUser, options?: SaveOptions): Promise<T>;
    destroyForUser(user: IUser, options?: DestroyOptions): Promise<any>;
    fetchForUser(user: IUser, fetchOptions?: any): Promise<T>;
    fetchAllForUser(user: IUser, fetchOptions?: FetchAllOptions): Promise<Collection<T>>;
    fetchPageForUser(user: IUser, options?: IFetchPageOptions): Promise<IPaginatedCollection<T>>;
    lazyLoad(relationships: Array<string>): Promise<T>;
}

export interface IScopeFactory {
    scopeForAcl(acl: string, action: ScopeAction): Scope;
}

export interface IUser {
    id: number;
    isAdmin(): boolean;
}

export enum ScopeAction {
    Read = 0,
    Write = 1,
}
export interface IKnexObject {
    _knex: any;
}
export abstract class Scope {
    readonly abstract aclString: string;
    abstract testAccess(user: IUser, object: any): Promise<boolean>;
    updateQueryReadAcl(user: IUser, object: any): Promise<any>;
    protected abstract updateKnexQuery(user: IUser, object: IKnexObject): Promise<any>;
}

export enum PostgresDataType {
    Single = "real",
    Double = "double precision",
}
export class Schemas {
    static createAutoUpdatedAtTimestampTrigger(knex: Knex): Knex.Raw;
    static dropAutoUpdatedAtTimestampTrigger(knex: Knex): Knex.Raw;
    static addAutoUpdatedAtTimestampTriggerForTable(knex: Knex, tableName: string): Knex.Raw;
    static changeColumnType(knex: Knex, table: string, column: string, newType: PostgresDataType): Knex.Raw;
    static dropTableCascade(knex: Knex, tableName: string): Knex.Raw;
    static createStandardTable(knex: Knex, tableName: string, builder: (t: Knex.TableBuilder) => void): Knex.SchemaBuilder;
}

export class PublicScope extends Scope {
    aclString: string;
    testAccess(user: IUser, object: any): Promise<boolean>;
    updateKnexQuery(user: IUser, object: IKnexObject): Promise<any>;
}

