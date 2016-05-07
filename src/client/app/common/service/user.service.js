"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var angular2_jwt_1 = require('angular2-jwt');
var backend_service_1 = require('./backend.service');
var api_service_1 = require('./api.service');
var user_1 = require('../user');
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(authHttp, backend) {
        _super.call(this, "user", authHttp, backend);
    }
    UserService.prototype.getConnectedUser = function () {
        return this.getById(this.backend.getConnectedUserId());
    };
    UserService.prototype.getById = function (userId) {
        var _this = this;
        var replacements = { "%7BuserId%7D": userId };
        return this.requestAPI("getById", function (link) { return _this.authHttp.get(link, { headers: _this.acceptHeader })
            .map(function (response) { return response.json(); })
            .map(function (userAsJson) { return _this.parseUser(userAsJson); }); }, replacements);
    };
    UserService.prototype.getByEmail = function (email) {
        var _this = this;
        var replacements = { "%7BuserEmail%7D": email };
        return this.requestAPI("getByEmail", function (link) { return _this.authHttp.get(link, { headers: _this.acceptHeader })
            .map(function (response) { return response.json(); })
            .map(function (userAsJson) { return _this.parseUser(userAsJson); }); }, replacements);
    };
    UserService.prototype.create = function (user) {
        var _this = this;
        var serializedUser = JSON.stringify(user);
        return this.requestAPI("create", function (link) { return _this.authHttp.post(link, serializedUser, { headers: _this.acceptContentTypeHeaders })
            .map(function (response) { return response.json(); })
            .map(function (userAsJson) { return _this.parseUser(userAsJson); }); });
    };
    UserService.prototype.update = function (user) {
        var _this = this;
        var replacements = { "%7BuserId%7D": user.id };
        var serializedUser = JSON.stringify(user);
        return this.requestAPI("update", function (link) { return _this.authHttp.put(link, serializedUser, { headers: _this.acceptContentTypeHeaders }); }, replacements);
    };
    UserService.prototype.changePassword = function (userId, password) {
        var _this = this;
        var replacements = { "%7BuserId%7D": userId, "%7BnewPassword%7D": password };
        return this.requestAPI("changePassword", function (link) { return _this.authHttp.put(link, null, { headers: _this.acceptContentTypeHeaders }); }, replacements);
    };
    UserService.prototype.deleteById = function (userId) {
        var _this = this;
        var replacements = { "%7BuserId%7D": userId };
        return this.requestAPI("getById", function (link) { return _this.authHttp.delete(link, { headers: _this.acceptHeader }); }, replacements);
    };
    UserService.prototype.parseUser = function (userAsJson) {
        return new user_1.User(userAsJson);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof angular2_jwt_1.AuthHttp !== 'undefined' && angular2_jwt_1.AuthHttp) === 'function' && _a) || Object, backend_service_1.BackendService])
    ], UserService);
    return UserService;
    var _a;
}(api_service_1.ApiService));
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map