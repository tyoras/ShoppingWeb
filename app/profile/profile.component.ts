import {Component, OnInit} from 'angular2/core';

import {Router, Location, CanActivate} from 'angular2/router';

import {tokenNotExpired} from 'angular2-jwt';

import {UserService} from '../common/service/user.service';
import {RegisterUserService} from '../common/service/register-user.service';
import {User} from '../common/user';

@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.component.html',
    styleUrls: ['app/profile/profile.component.css']
})
@CanActivate(() => tokenNotExpired())
export class ProfileComponent implements OnInit {
	
	connectedUser: User = new User({});

	constructor(private userService: UserService) {

	}

	ngOnInit() {
		console.log("on init connected home");
		let userToCreate: User = new User({ name: "testAngular4", email: "angular@test5.com" });
		userToCreate.password = "test";
        this.userService.getConnectedUser().subscribe(user => this.connectedUser = user);
        this.userService.create(userToCreate).subscribe(user2 => {
			console.log("user created with id : " + user2.id);
			user2.email = "modified@test.com";
			this.userService.update(user2).subscribe(() => {
				console.log("user updated with email :");
				this.userService.getById(user2.id).subscribe(modifiedUser => {
					console.log(modifiedUser.email);
					this.userService.changePassword(user2.id, "pass").subscribe(() => {
						console.log("password change done");
						this.userService.deleteById(user2.id).subscribe(() => {
							console.log("user deleted");
						});
					});
				});
			});
		});
    }

}