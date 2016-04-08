import {Component, OnInit} from 'angular2/core';

import {Router, Location, CanActivate} from 'angular2/router';

import {tokenNotExpired} from 'angular2-jwt';

import {UserService} from '../common/service/user.service';
import {User} from '../common/user';

@Component({
    selector: 'connected-home',
    templateUrl: 'app/connected-home/connected-home.component.html',
    styleUrls: ['app/connected-home/connected-home.component.css']
})
@CanActivate(() => tokenNotExpired())
export class ConnectedHomeComponent implements OnInit {
	private connectedUser: User = { id: "", name: "", email: "" };

	constructor(private userService: UserService) {

	}

	ngOnInit() {
		console.log("on init connected home")
        this.userService.getConnectedUser().subscribe(user => { this.connectedUser = user });
    }

	isAuthenticated(): boolean {
		return tokenNotExpired();
	}

	getConnectedUser() : User {
		return this.connectedUser;
	}
}