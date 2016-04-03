import {Component} from 'angular2/core';

import {Router, Location, CanActivate} from 'angular2/router';

import {tokenNotExpired} from 'angular2-jwt';

import {AuthService} from '../common/service/auth.service';

@Component({
    selector: 'connected-home',
    templateUrl: 'app/connected-home/connected-home.component.html',
    styleUrls: ['app/connected-home/connected-home.component.css']
})
@CanActivate(() => tokenNotExpired())
export class ConnectedHomeComponent {

	constructor(private authService: AuthService) {

	}

	token(): string {
		return this.authService.getSession().token;
	}

	isAuthenticated(): boolean {
		return tokenNotExpired();
	}
}