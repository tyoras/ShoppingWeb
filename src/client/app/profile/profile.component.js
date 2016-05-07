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
var user_service_1 = require('../common/service/user.service');
var user_1 = require('../common/user');
var ProfileComponent = (function () {
    function ProfileComponent(fb, router, location, userService) {
        this.router = router;
        this.location = location;
        this.userService = userService;
        this.connectedUser = new user_1.User({});
        this.profileForm = fb.group({
            name: ["", common_1.Validators.required],
            email: ["", common_1.Validators.required]
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("on init connected home");
        var userToCreate = new user_1.User({ name: "testAngular4", email: "angular@test5.com" });
        userToCreate.password = "test";
        this.userService.getConnectedUser().subscribe(function (user) { return _this.connectedUser = user; });
        this.userService.create(userToCreate).subscribe(function (user2) {
            console.log("user created with id : " + user2.id);
            user2.email = "modified@test.com";
            _this.userService.update(user2).subscribe(function () {
                console.log("user updated with email :");
                _this.userService.getById(user2.id).subscribe(function (modifiedUser) {
                    console.log(modifiedUser.email);
                    _this.userService.changePassword(user2.id, "pass").subscribe(function () {
                        console.log("password change done");
                        _this.userService.deleteById(user2.id).subscribe(function () {
                            console.log("user deleted");
                        });
                    });
                });
            });
        });
    };
    ProfileComponent.prototype.updateUser = function (value) {
        var _this = this;
        var userToUpdate = new user_1.User(value);
        userToUpdate.id = this.connectedUser.id;
        this.userService.update(userToUpdate)
            .subscribe(function () { return _this.router.navigate(['../Profile']); }, function (error) { return console.error(error); });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: 'app/profile/profile.component.html',
            styleUrls: ['app/profile/profile.component.css'],
            directives: [common_1.FORM_DIRECTIVES]
        }),
        router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof common_1.FormBuilder !== 'undefined' && common_1.FormBuilder) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _c) || Object, user_service_1.UserService])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b, _c;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map