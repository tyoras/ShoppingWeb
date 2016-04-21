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
var angular2_jwt_1 = require('angular2-jwt');
var config_service_1 = require('./config.service');
var api_link_1 = require('../api-link');
var BackendService = (function () {
    function BackendService(configService, http, authHttp) {
        var _this = this;
        this.configService = configService;
        this.http = http;
        this.authHttp = authHttp;
        this.apis = [];
        configService.configStream.subscribe(function (updatedConfig) {
            _this.config = updatedConfig;
            _this.rootEndpointUrl = _this.config.backendProtocol + "://" + _this.config.backendHost + ":" + _this.config.backendPort + "/" + _this.config.backendRoot + "/api";
            if (angular2_jwt_1.tokenNotExpired()) {
                _this.loadRoot();
            }
        });
    }
    BackendService.prototype.loadRoot = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var request = new http_1.Request({
            url: this.rootEndpointUrl,
            method: http_1.RequestMethod.Options,
            headers: headers
        });
        return this.authHttp.request(request)
            .map(function (response) { return response.json(); })
            .map(function (rootAsJson) { return _this.parseRoot(rootAsJson); });
    };
    BackendService.prototype.parseRoot = function (rootAsJson) {
        this.connectedUserId = rootAsJson.connectedUserId;
        this.apis = [];
        for (var _i = 0, _a = rootAsJson.links; _i < _a.length; _i++) {
            var link = _a[_i];
            this.apis.push(new api_link_1.APILink(link));
        }
    };
    BackendService.prototype.getLink = function (rel) {
        return this.apis.filter(function (link) { return link.rel === rel; })[0].href;
    };
    BackendService.prototype.getConnectedUserId = function () {
        return this.connectedUserId;
    };
    BackendService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_service_1.ConfigService, (typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof angular2_jwt_1.AuthHttp !== 'undefined' && angular2_jwt_1.AuthHttp) === 'function' && _b) || Object])
    ], BackendService);
    return BackendService;
    var _a, _b;
}());
exports.BackendService = BackendService;
//# sourceMappingURL=backend.service.js.map