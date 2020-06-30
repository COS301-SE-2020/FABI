"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Reports = /** @class */ (function () {
    function Reports() {
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        typeorm_1.Generated("increment")
    ], Reports.prototype, "reportID");
    __decorate([
        typeorm_1.Column()
    ], Reports.prototype, "emails");
    __decorate([
        typeorm_1.Column()
    ], Reports.prototype, "form");
    __decorate([
        typeorm_1.Column()
    ], Reports.prototype, "IMG1");
    __decorate([
        typeorm_1.Column()
    ], Reports.prototype, "IMG2");
    __decorate([
        typeorm_1.Column()
    ], Reports.prototype, "IMG3");
    Reports = __decorate([
        typeorm_1.Entity({ database: "Reports" })
    ], Reports);
    return Reports;
}());
exports["default"] = Reports;
