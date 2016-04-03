import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {tokenNotExpired} from 'angular2-jwt';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ConnectedHomeComponent} from './connected-home/connected-home.component';
import {AuthService} from './common/service/auth.service';


@Component({
    selector: 'shopping-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, AuthService]
})
@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent},
	{path: '/login', name: 'Login', component: LoginComponent},
	{path: '/protected', name: 'Protected', component: ConnectedHomeComponent},
	{path: '/**', redirectTo: ['Home']}
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