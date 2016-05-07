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
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/share');
require('rxjs/Rx');
var Observable_1 = require('rxjs/Observable');
var config_1 = require('../config');
var ConfigService = (function () {
    function ConfigService(http) {
        var _this = this;
        this.http = http;
        this.configStream = new Observable_1.Observable(function (observer) { return _this.configObserver = observer; }).share();
    }
    ConfigService.prototype.load = function () {
        var _this = this;
        if (!this.cachedConfig) {
            this.http.get('config.json')
                .map(function (response) { return response.json(); })
                .subscribe(function (configAsJson) {
                _this.cachedConfig = new config_1.Config(configAsJson);
                _this.configObserver.next(_this.cachedConfig);
            }, function (error) { return console.log("Unable to load config"); });
        }
        else {
            this.configObserver.next(this.cachedConfig);
        }
    };
    ConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ConfigService);
    return ConfigService;
    var _a;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map