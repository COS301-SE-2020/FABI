"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var login_register_module_1 = require("./login-register/login-register.module");
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var database_module_1 = require("./database/database.module");
var upload_module_1 = require("./report/upload.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                graphql_1.GraphQLModule.forRoot({
                    typePaths: ['./**/*.graphql'],
                    resolverValidationOptions: {
                        requireResolversForResolveType: false
                    },
                    installSubscriptionHandlers: true
                }),
                login_register_module_1.LoginRegisterModule,
                database_module_1.DatabaseModule,
                upload_module_1.UploadModule,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
