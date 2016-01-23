import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {tokenNotExpired} from 'angular2-jwt';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthService} from './common/service/auth.service';


@Component({
    selector: 'shopping-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent},
	{path: '/login', name: 'Login', component: LoginComponent}
])
export class AppComponent {

	constructor(private authService: AuthService) {

	} 

	authenticated() {
        return tokenNotExpired();
    }

    logout() {
		this.authService.logout();
    }
}