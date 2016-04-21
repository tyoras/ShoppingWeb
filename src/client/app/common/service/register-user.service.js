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
var core_1 = require("angular2/core");
var http_1 = require('angular2/http');
var config_service_1 = require('./config.service');
var user_1 = require('../user');
var RegisterUserService = (function () {
    function RegisterUserService(configService, http) {
        var _this = this;
        this.configService = configService;
        this.http = http;
        configService.configStream.subscribe(function (updatedConfig) {
            _this.config = updatedConfig;
            _this.rootEndpointUrl = _this.config.backendProtocol + "://" + _this.config.backendHost + ":" + _this.config.backendPort + "/" + _this.config.backendRoot + "/public/user";
        });
        configService.load();
    }
    RegisterUserService.prototype.register = function (user) {
        var _this = this;
        var serializedUser = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.rootEndpointUrl, serializedUser, { headers: headers })
            .map(function (response) { return response.json(); })
            .map(function (userAsJson) { return _this.parseUser(userAsJson); });
    };
    RegisterUserService.prototype.parseUser = function (userAsJson) {
        return new user_1.User(userAsJson);
    };
    RegisterUserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_service_1.ConfigService, (typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], RegisterUserService);
    return RegisterUserService;
    var _a;
}());
exports.RegisterUserService = RegisterUserService;
//# sourceMappingURL=register-user.service.js.map