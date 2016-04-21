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
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var angular2_jwt_1 = require('angular2-jwt');
var config_service_1 = require('../common/service/config.service');
var auth_service_1 = require('../common/service/auth.service');
var LoginComponent = (function () {
    function LoginComponent(fb, router, location, configService, authService) {
        var _this = this;
        this.router = router;
        this.location = location;
        this.configService = configService;
        this.authService = authService;
        this.configSubscription = configService.configStream.subscribe(function (updatedConfig) { return _this.config = updatedConfig; });
        this.loginForm = fb.group({
            email: ["", common_1.Validators.required],
            password: ["", common_1.Validators.required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.configService.load();
    };
    LoginComponent.prototype.doLogin = function (value) {
        var _this = this;
        this.authService.loginPasswordFlow(value.email, value.password)
            .subscribe(function () { return _this.router.navigate(['../Home']); }, function (error) { return console.error(error); });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.configSubscription) {
            this.configSubscription.unsubscribe();
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/login/login.component.html',
            styleUrls: ['app/login/login.component.css'],
            directives: [common_1.FORM_DIRECTIVES]
        }),
        router_1.CanActivate(function () { return !angular2_jwt_1.tokenNotExpired(); }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof common_1.FormBuilder !== 'undefined' && common_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _c) || Object, config_service_1.ConfigService, auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map