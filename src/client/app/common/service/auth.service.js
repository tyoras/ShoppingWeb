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
var backend_service_1 = require('./backend.service');
var AuthService = (function () {
    function AuthService(configService, backendService, http) {
        var _this = this;
        this.configService = configService;
        this.backendService = backendService;
        this.http = http;
        this.authenticated = false;
        this.expires = 0;
        this.expiresTimerId = null;
        configService.configStream.subscribe(function (updatedConfig) {
            _this.config = updatedConfig;
            _this.oauth2TokenEndpointUrl = _this.config.backendProtocol + "://" + _this.config.backendHost + ":" + _this.config.backendPort + "/" + _this.config.backendRoot + _this.config.backendAuthEndpoint;
        });
        configService.load();
    }
    AuthService.prototype.loginPasswordFlow = function (email, password) {
        var _this = this;
        var headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        });
        var body = "grant_type=password&client_id=" + this.config.clientId + "&client_secret=not_required&username=" + email + "&password=" + password;
        return this.http.post(this.oauth2TokenEndpointUrl, body, { headers: headers })
            .map(function (response) { return response.json(); })
            .map(function (respAsJson) {
            _this.token = respAsJson.access_token;
            localStorage.setItem('id_token', _this.token);
            var expiresSeconds = Number(respAsJson.expires_in) || 1800;
            if (_this.token) {
                _this.authenticated = true;
            }
            _this.startExpiresTimer(expiresSeconds);
            _this.expires = new Date();
            _this.expires = _this.expires.setSeconds(_this.expires.getSeconds() + expiresSeconds);
            _this.backendService.loadRoot().subscribe(function () { });
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('id_token');
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
    };
    AuthService.prototype.getSession = function () {
        return { authenticated: this.authenticated, token: this.token, expires: this.expires };
    };
    AuthService.prototype.startExpiresTimer = function (seconds) {
        var _this = this;
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(function () {
            console.log('Session has expired');
            _this.logout();
        }, seconds * 1000);
        console.log('Token expiration timer set for', seconds, "seconds");
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.authenticated;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_service_1.ConfigService, backend_service_1.BackendService, (typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map