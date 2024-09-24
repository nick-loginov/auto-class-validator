"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDto = exports.SubTestDto = void 0;
var class_validator = require("@nestjs/class-validator");
var SubTestDto = /** @class */ (function () {
    function SubTestDto() {
    }
    __decorate([
        class_validator.IsString({})
    ], SubTestDto.prototype, "field", void 0);
    __decorate([
        class_validator.IsNumber({})
    ], SubTestDto.prototype, "number", void 0);
    return SubTestDto;
}());
exports.SubTestDto = SubTestDto;
var TestDto = /** @class */ (function () {
    function TestDto() {
    }
    __decorate([
        class_validator.IsBoolean({}),
        class_validator.IsOptional()
    ], TestDto.prototype, "optionalField", void 0);
    __decorate([
        class_validator.IsString({}),
        class_validator.IsOptional()
    ], TestDto.prototype, "optionalField2", void 0);
    __decorate([
        class_validator.IsString({})
    ], TestDto.prototype, "field", void 0);
    __decorate([
        class_validator.IsNumber({})
    ], TestDto.prototype, "number", void 0);
    __decorate([
        class_validator.IsBoolean({})
    ], TestDto.prototype, "boolean", void 0);
    __decorate([
        class_validator.IsNumber({ each: true }),
        class_validator.IsArray()
    ], TestDto.prototype, "array", void 0);
    __decorate([
        class_validator.IsArray()
    ], TestDto.prototype, "listSub", void 0);
    return TestDto;
}());
exports.TestDto = TestDto;
