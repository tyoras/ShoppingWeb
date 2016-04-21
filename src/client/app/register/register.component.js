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
var register_user_service_1 = require('../common/service/register-user.service');
var user_1 = require('../common/user');
var RegisterComponent = (function () {
    function RegisterComponent(fb, router, location, registerService) {
        this.router = router;
        this.location = location;
        this.registerService = registerService;
        this.registerForm = fb.group({
            name: ["", common_1.Validators.required],
            email: ["", common_1.Validators.required],
            password: ["", common_1.Validators.required]
        });
    }
    RegisterComponent.prototype.registerUser = function (value) {
        var _this = this;
        var userToCreate = new user_1.User(value);
        userToCreate.password = value.password;
        this.registerService.register(userToCreate)
            .subscribe(function () { return _this.router.navigate(['../Login']); }, function (error) { return console.error(error); });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: 'app/register/register.component.html',
            styleUrls: ['app/register/register.component.css'],
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof common_1.FormBuilder !== 'undefined' && common_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _c) || Object, register_user_service_1.RegisterUserService])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map