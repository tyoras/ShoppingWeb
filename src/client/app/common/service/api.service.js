"use strict";
var http_1 = require('angular2/http');
var angular2_jwt_1 = require('angular2-jwt');
var api_link_1 = require('../api-link');
var ApiService = (function () {
    function ApiService(apiRel, authHttp, backend) {
        this.apiRel = apiRel;
        this.authHttp = authHttp;
        this.backend = backend;
        this.acceptHeader = new http_1.Headers({ 'Accept': 'application/json' });
        this.acceptContentTypeHeaders = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        if (!angular2_jwt_1.tokenNotExpired()) {
            console.error("Trying to instanciate API Service without valid token");
        }
    }
    ApiService.prototype.loadRoot = function () {
        var _this = this;
        var url = this.backend.getLink(this.apiRel);
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        var request = new http_1.Request({
            url: url,
            method: http_1.RequestMethod.Options,
            headers: headers
        });
        return this.authHttp.request(request)
            .map(function (response) { return response.json(); })
            .map(function (rootAsJson) { return _this.parseRoot(rootAsJson); });
    };
    ApiService.prototype.parseRoot = function (rootAsJson) {
        this.apis = [];
        for (var _i = 0, _a = rootAsJson.links; _i < _a.length; _i++) {
            var link = _a[_i];
            this.apis.push(new api_link_1.APILink(link));
        }
    };
    ApiService.prototype.requestAPI = function (rel, request, replacements) {
        var _this = this;
        if (this.apis) {
            return request(this.replacePlaceholders(this.getLink(rel), replacements));
        }
        else {
            return this.loadRoot().flatMap(function () { return request(_this.replacePlaceholders(_this.getLink(rel), replacements)); });
        }
    };
    ApiService.prototype.getLink = function (rel) {
        return this.apis.filter(function (link) { return link.rel === rel; })[0].href;
    };
    ApiService.prototype.replacePlaceholders = function (link, replacements) {
        if (replacements) {
            return link.replace(/%7B\w+%7D/g, function (placeholder) { return replacements[placeholder] || placeholder; });
        }
        else {
            return link;
        }
    };
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map