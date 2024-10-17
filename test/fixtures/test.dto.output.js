"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDto = exports.SubTestDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator = require("@nestjs/class-validator");
var SubTestDto = /** @class */ (function () {
    function SubTestDto() {
    }
    SubTestDto._OPENAPI_METADATA_FACTORY = function () {
        return { field: { required: true, type: function () { return String; } }, number: { required: true, type: function () { return Number; } } };
    };
    __decorate([
        class_validator.IsString({}),
        __metadata("design:type", String)
    ], SubTestDto.prototype, "field", void 0);
    __decorate([
        class_validator.IsNumber({}),
        __metadata("design:type", Number)
    ], SubTestDto.prototype, "number", void 0);
    return SubTestDto;
}());
exports.SubTestDto = SubTestDto;
var TestDto = /** @class */ (function () {
    function TestDto() {
    }
    TestDto._OPENAPI_METADATA_FACTORY = function () {
        return { optionalField: { required: false, type: function () { return Boolean; } }, optionalField2: { required: true, type: function () { return String; } }, field: { required: true, type: function () { return String; } }, number: { required: true, type: function () { return Number; } }, boolean: { required: true, type: function () { return Boolean; } }, array: { required: true, type: function () { return [Number]; } }, object: { required: true, type: function () { return require("./test.dto").SubTestDto; } }, listSub: { required: true, type: function () { return [require("./test.dto").SubTestDto]; } } };
    };
    __decorate([
        class_validator.IsBoolean({}),
        class_validator.IsOptional(),
        __metadata("design:type", Boolean)
    ], TestDto.prototype, "optionalField", void 0);
    __decorate([
        class_validator.IsString({}),
        class_validator.IsOptional(),
        __metadata("design:type", String)
    ], TestDto.prototype, "optionalField2", void 0);
    __decorate([
        class_validator.IsString({}),
        __metadata("design:type", String)
    ], TestDto.prototype, "field", void 0);
    __decorate([
        class_validator.IsNumber({}),
        __metadata("design:type", Number)
    ], TestDto.prototype, "number", void 0);
    __decorate([
        class_validator.IsBoolean({}),
        __metadata("design:type", Boolean)
    ], TestDto.prototype, "boolean", void 0);
    __decorate([
        class_validator.IsNumber({ each: true }),
        class_validator.IsArray(),
        __metadata("design:type", Array)
    ], TestDto.prototype, "array", void 0);
    __decorate([
        class_validator.IsArray(),
        __metadata("design:type", Array)
    ], TestDto.prototype, "listSub", void 0);
    return TestDto;
}());
exports.TestDto = TestDto;
