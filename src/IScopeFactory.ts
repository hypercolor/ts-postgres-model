import { Scope, ScopeAction } from "./Scope";

export interface IScopeFactory {
  scopeForAcl(acl: string, action: ScopeAction): Scope;
}
