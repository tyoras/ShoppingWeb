import {Component} from 'angular2/core';

import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';

import {AuthService} from '../common/service/auth.service';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['app/home/home.component.css']
})
export class HomeComponent { 

	constructor(private authService: AuthService) {

	}

	isAuthenticated(): boolean {
		return tokenNotExpired();
	}
}