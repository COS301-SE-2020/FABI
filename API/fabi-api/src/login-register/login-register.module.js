"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginRegisterModule = void 0;
var common_1 = require("@nestjs/common");
var register_resolver_1 = require("./register/register.resolver");
var login_resolver_1 = require("./login/login.resolver");
var register_service_1 = require("./register/register.service");
var users_service_1 = require("../database/Users/users.service");
var Users_module_1 = require("../database/Users/Users.module");
var login_service_1 = require("./login/login.service");
var LoginRegisterModule = /** @class */ (function () {
    function LoginRegisterModule() {
    }
    LoginRegisterModule = __decorate([
        common_1.Module({
            providers: [register_resolver_1.RegisterResolver, login_resolver_1.LoginResolver, register_service_1.RegisterService, users_service_1.UsersService, login_service_1.LoginService],
            imports: [Users_module_1.UsersModule]
        })
    ], LoginRegisterModule);
    return LoginRegisterModule;
}());
exports.LoginRegisterModule = LoginRegisterModule;
