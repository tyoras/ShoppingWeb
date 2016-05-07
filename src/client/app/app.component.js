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
var router_1 = require('angular2/router');
var angular2_jwt_1 = require('angular2-jwt');
var home_component_1 = require('./home/home.component');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./register/register.component');
var profile_component_1 = require('./profile/profile.component');
var auth_service_1 = require('./common/service/auth.service');
var AppComponent = (function () {
    function AppComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AppComponent.prototype.authenticated = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/Home']);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'shopping-app',
            templateUrl: 'app/app.component.html',
            styleUrls: ['app/app.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [router_1.ROUTER_PROVIDERS]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'Home', component: home_component_1.HomeComponent },
            { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
            { path: '/register', name: 'Register', component: register_component_1.RegisterComponent },
            { path: '/profile', name: 'Profile', component: profile_component_1.ProfileComponent },
            { path: '/**', redirectTo: ['Home'] }
        ]), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map