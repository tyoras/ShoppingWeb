import {Component} from 'angular2/core';

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
		return this.authService.isAuthenticated();
	}
}