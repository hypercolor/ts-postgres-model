(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! exports provided: PostgresModel, Scope, ScopeAction, Schemas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_PostgresModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/PostgresModel */ "./src/PostgresModel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PostgresModel", function() { return _src_PostgresModel__WEBPACK_IMPORTED_MODULE_0__["PostgresModel"]; });

/* harmony import */ var _src_Scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Scope */ "./src/Scope.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scope", function() { return _src_Scope__WEBPACK_IMPORTED_MODULE_1__["Scope"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScopeAction", function() { return _src_Scope__WEBPACK_IMPORTED_MODULE_1__["ScopeAction"]; });

/* harmony import */ var _src_Schemas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/Schemas */ "./src/Schemas.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Schemas", function() { return _src_Schemas__WEBPACK_IMPORTED_MODULE_2__["Schemas"]; });







/***/ }),

/***/ "./src/PostgresModel.ts":
/*!******************************!*\
  !*** ./src/PostgresModel.ts ***!
  \******************************/
/*! exports provided: bookshelf, PostgresModelScopeFactory, PostgresModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bookshelf", function() { return bookshelf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostgresModelScopeFactory", function() { return PostgresModelScopeFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostgresModel", function() { return PostgresModel; });
/* harmony import */ var knex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knex */ "knex");
/* harmony import */ var knex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bookshelf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bookshelf */ "bookshelf");
/* harmony import */ var bookshelf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bookshelf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bluebird */ "bluebird");
/* harmony import */ var bluebird__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bluebird__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pluralize */ "pluralize");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Scope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Scope */ "./src/Scope.ts");

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import * as Bookshelf from 'bookshelf';


var knexConfig = {
    client: 'postgresql',
    connection: process.env.POSTGRES_URL,
    debug: process.env.KNEX_DEBUG === 'true'
};
var bookshelf = bookshelf__WEBPACK_IMPORTED_MODULE_1__(knex__WEBPACK_IMPORTED_MODULE_0__(knexConfig));
bookshelf.plugin('pagination');



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
var PostgresModelScopeFactory = (function () {
    function PostgresModelScopeFactory() {
    }
    return PostgresModelScopeFactory;
}());

var PostgresModel = (function (_super) {
    __extends(PostgresModel, _super);
    function PostgresModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PostgresModel.prototype, "readOnlyColumns", {
        // abstract get defaultReadAcl(): string;
        // abstract get defaultWriteAcl(): string;
        // abstract get columns(): object;
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel, "instanceName", {
        get: function () {
            return this.name.charAt(0).toLowerCase() + this.name.slice(1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel, "pluralInstanceName", {
        get: function () {
            return pluralize__WEBPACK_IMPORTED_MODULE_3__(this.instanceName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel.prototype, "hasTimestamps", {
        get: function () { return true; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel.prototype, "createdAt", {
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
        get: function () { return this.get('created_at'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel.prototype, "updatedAt", {
        get: function () { return this.get('updated_at'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel.prototype, "readAcl", {
        //
        get: function () { return this.get('readAcl'); },
        set: function (value) { this.set('readAcl', value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel.prototype, "writeAcl", {
        get: function () { return this.get('writeAcl'); },
        set: function (value) { this.set('writeAcl', value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel.prototype, "deleted", {
        //
        get: function () { return this.get('deleted') || false; },
        set: function (value) { this.set('deleted', value); },
        enumerable: true,
        configurable: true
    });
    //
    // get userId(): number | null { return this.get('userId'); }
    // set userId(value: number | null) { this.set('userId',value); }
    //
    // get companyId(): number | null { return this.get('companyId'); }
    // set companyId(value: number | null) { this.set('companyId',value); }
    // ==============================
    //  Business Logic
    // ==============================
    PostgresModel.prototype.willBeUpdated = function (newParams) {
        return Promise.resolve(newParams);
    };
    PostgresModel.prototype.updateWithParams = function (params, user, options) {
        var _this = this;
        var restrictedKeys = [
            'id',
            'readAcl',
            'writeAcl'
        ].concat(this.readOnlyColumns);
        return this.willBeUpdated(params)
            .then(function (updatedParams) {
            Object.keys(updatedParams).forEach(function (key) {
                if (restrictedKeys.indexOf(key) === -1) {
                    _this.set(key, updatedParams[key]);
                }
            });
            return _this.saveForUser(user, options);
        });
    };
    Object.defineProperty(PostgresModel.prototype, "readAclScope", {
        // ==============================
        //  Access Control
        // ==============================
        get: function () {
            if (this.readAcl) {
                return PostgresModelScopeFactory.scopeFactory.scopeForAcl(this.readAcl, _Scope__WEBPACK_IMPORTED_MODULE_4__["ScopeAction"].Read);
            }
            else {
                return this.defaultReadAclScope;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostgresModel.prototype, "writeAclScope", {
        get: function () {
            if (this.writeAcl) {
                return PostgresModelScopeFactory.scopeFactory.scopeForAcl(this.writeAcl, _Scope__WEBPACK_IMPORTED_MODULE_4__["ScopeAction"].Write);
            }
            else {
                return this.defaultWriteAclScope;
            }
        },
        enumerable: true,
        configurable: true
    });
    PostgresModel.prototype.save = function () {
        return bluebird__WEBPACK_IMPORTED_MODULE_2__["reject"]({ code: 500, error: 'Must use saveForUser.' });
    };
    PostgresModel.prototype.saveForUser = function (user, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.id === undefined) {
                // If no id, it must be a new object so we'll just let the save through
                resolve(true);
            }
            else {
                _this.writeAclScope.testAccess(user, _this).then(resolve).catch(reject);
                // AccessControl.verifyRequestHasPermissionToWriteObject(req,this).then(resolve).catch(reject);
            }
        })
            .then(function (allowed) {
            if (allowed) {
                // return Promise.resolve(this);
                return _super.prototype.save.call(_this, undefined, options)
                    .then(function (result) {
                    return Promise.resolve(result);
                });
            }
            else {
                // const companyIds = user !== undefined ? user.getVisibleCompanyIds() : [];
                // console.log('Failed auth test for object: ' + JSON.stringify(this) + ' for user: ' + JSON.stringify(user) + ' with companies: ' + JSON.stringify(companyIds));
                return Promise.reject({ code: 403, error: 'User not authorized for that action.' });
                // return Promise.reject(new Error(''));
            }
        });
    };
    PostgresModel.prototype.saveIgnoringWriteAcl = function (key, val, options) {
        var _this = this;
        return Promise.resolve().then(function () {
            return _super.prototype.save.call(_this, key, val, options);
        });
    };
    PostgresModel.prototype.destroy = function (options) {
        return bluebird__WEBPACK_IMPORTED_MODULE_2__["reject"]({ code: 500, error: 'Must use destroyForUser.' });
    };
    PostgresModel.prototype.destroyForUser = function (user, options) {
        var _this = this;
        return this.writeAclScope.testAccess(user, this)
            .then(function (allowed) {
            if (allowed) {
                return _super.prototype.destroy.call(_this, options);
            }
            else {
                return Promise.reject({ code: 403, error: 'User not authorized for that action.' });
            }
        });
    };
    PostgresModel.prototype.fetch = function (fetchOptions) {
        return bluebird__WEBPACK_IMPORTED_MODULE_2__["reject"]({ code: 500, error: new Error('Must use fetchForUser.') });
    };
    PostgresModel.prototype.fetchForUser = function (user, fetchOptions) {
        var _this = this;
        var result;
        return Promise.resolve().then(function () {
            return _super.prototype.fetch.call(_this, fetchOptions);
        })
            .then(function (r) {
            result = r;
            if (result) {
                return _this.readAclScope.testAccess(user, result);
            }
            else {
                return Promise.resolve(true);
            }
            // return AccessControl.testObjectReadAuthorizationForRequest(result,req);
        })
            .then(function (authorized) {
            if (authorized) {
                return Promise.resolve(result);
            }
            else {
                console.log('Unauthorized for read access to object: ' + JSON.stringify(result));
                console.log('');
                console.log(' for user: ' + JSON.stringify(user));
                return Promise.reject({ code: 403, error: 'Unauthorized.' });
            }
        });
    };
    PostgresModel.prototype.fetchIgnoringReadAcl = function (fetchOptions) {
        var _this = this;
        return Promise.resolve().then(function () {
            return _super.prototype.fetch.call(_this, fetchOptions);
        });
    };
    // public fetchAll(fetchOptions?: FetchAllOptions){
    //   const unlock = fetchOptions ? (fetchOptions as any).unlock : null;
    //   if (unlock){
    //     return super.fetchAll(fetchOptions);
    //   } else {
    //     return BlueBird.reject({code: 500, error: new Error('Must use fetchAllForUser.')});
    //   }
    // }
    PostgresModel.prototype.fetchAllForUser = function (user, fetchOptions) {
        var _this = this;
        return this.readAclScope.updateQueryReadAcl(user, this)
            .then(function () {
            return _super.prototype.fetchAll.call(_this, fetchOptions);
        });
    };
    PostgresModel.prototype.fetchPageForUser = function (user, options) {
        var _this = this;
        return this.readAclScope.updateQueryReadAcl(user, this)
            .then(function () {
            return _this.fetchPage(options);
        });
    };
    PostgresModel.prototype.fetchAllIgnoringReadAcl = function (fetchOptions) {
        var _this = this;
        return Promise.resolve().then(function () {
            return _super.prototype.fetchAll.call(_this, fetchOptions);
        });
    };
    return PostgresModel;
}(bookshelf.Model));



/***/ }),

/***/ "./src/Schemas.ts":
/*!************************!*\
  !*** ./src/Schemas.ts ***!
  \************************/
/*! exports provided: PostgresDataType, Schemas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostgresDataType", function() { return PostgresDataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schemas", function() { return Schemas; });

var PostgresDataType;
(function (PostgresDataType) {
    PostgresDataType["Single"] = "real";
    PostgresDataType["Double"] = "double precision";
})(PostgresDataType = PostgresDataType || (PostgresDataType = {}));
var Schemas = (function () {
    function Schemas() {
    }
    Schemas.createAutoUpdatedAtTimestampTrigger = function (knex) {
        return knex.raw(this.autoUpdateSQL);
    };
    Schemas.dropAutoUpdatedAtTimestampTrigger = function (knex) {
        return knex.raw(this.dropFunction);
    };
    Schemas.addAutoUpdatedAtTimestampTriggerForTable = function (knex, tableName) {
        return knex.raw("CREATE TRIGGER update_" + tableName + "_updated_at BEFORE UPDATE ON " + tableName + " FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();");
    };
    Schemas.changeColumnType = function (knex, table, column, newType) {
        return knex.raw('ALTER TABLE "' + table + '" ALTER COLUMN "' + column + '" TYPE ' + newType + '');
    };
    Schemas.dropTableCascade = function (knex, tableName) {
        return knex.raw('DROP TABLE ' + tableName + ' CASCADE');
    };
    // public static alterConstraint(knex: Knex, table: string, constraintName: string) {
    //
    //   const sql = 'begin;\n' +
    //     '\n' +
    //     'alter table ' + table + '\n' +
    //     'drop constraint ' + constraintName + ';\n' +
    //     '\n' +
    //     'alter table ' + table + '\n' +
    //     'add constraint ' + constraintName + '\n' +
    //     'foreign key (customer_id)\n' +
    //     'references customers (id)\n' +
    //     'on delete cascade;\n' +
    //     '\n' +
    //     'commit;'
    //
    // }
    Schemas.createStandardTable = function (knex, tableName, builder) {
        return knex.schema.createTable(tableName, function (t) {
            t.increments("id").primary();
            t.timestamps(false, true);
            t.boolean('deleted').notNullable().defaultTo(false);
            builder(t);
        });
    };
    Schemas.autoUpdateSQL = "CREATE OR REPLACE FUNCTION update_updated_at_column()\n RETURNS TRIGGER AS $$ \nBEGIN \n   IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN\n      NEW.updated_at = now();\n      RETURN NEW;\n   ELSE\n      RETURN OLD;\n   END IF;\nEND;\n$$ language 'plpgsql';";
    Schemas.dropFunction = "DROP FUNCTION update_updated_at_column();";
    return Schemas;
}());



/***/ }),

/***/ "./src/Scope.ts":
/*!**********************!*\
  !*** ./src/Scope.ts ***!
  \**********************/
/*! exports provided: ScopeAction, Scope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScopeAction", function() { return ScopeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scope", function() { return Scope; });

// TODO: Refactor this interface to allow each concrete class to provide their own assumptions about keys on the model
// export interface IScopeableObject {
//   readAcl: string | null;
//   writeAcl: string | null;
//   id: number;
//   tableName: string;
// }
var ScopeAction;
(function (ScopeAction) {
    ScopeAction[ScopeAction["Read"] = 0] = "Read";
    ScopeAction[ScopeAction["Write"] = 1] = "Write";
})(ScopeAction = ScopeAction || (ScopeAction = {}));
var Scope = (function () {
    function Scope() {
    }
    Scope.prototype.updateQueryReadAcl = function (user, object) {
        var knexableObject = object;
        if (knexableObject._knex === undefined) {
            return Promise.reject({ code: 500, error: 'No _knex found on object: ' + JSON.stringify(knexableObject) });
        }
        if (user && user.isAdmin()) {
            return Promise.resolve();
        }
        else {
            return this.updateKnexQuery(user, knexableObject);
        }
    };
    return Scope;
}());



/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.ts */"./index.ts");


/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),

/***/ "bookshelf":
/*!****************************!*\
  !*** external "bookshelf" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bookshelf");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),

/***/ "pluralize":
/*!****************************!*\
  !*** external "pluralize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pluralize");

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map