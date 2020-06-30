"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadModule = void 0;
var common_1 = require("@nestjs/common");
var upload_service_1 = require("./upload/upload.service");
var Users_module_1 = require("../database/Users/Users.module");
var upload_resolver_1 = require("./upload/upload.resolver");
var users_service_1 = require("../database/Users/users.service");
var report_service_1 = require("../database/Report/report.service");
var report_module_1 = require("../database/Report/report.module");
var UploadModule = /** @class */ (function () {
    function UploadModule() {
    }
    UploadModule = __decorate([
        common_1.Module({
            providers: [upload_service_1.UploadService, upload_resolver_1.UploadResolver, users_service_1.UsersService, report_service_1.ReportService],
            imports: [Users_module_1.UsersModule, report_module_1.ReportModule]
        })
    ], UploadModule);
    return UploadModule;
}());
exports.UploadModule = UploadModule;
