import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {tokenNotExpired} from 'angular2-jwt';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthService} from './common/service/auth.service';


@Component({
    selector: 'shopping-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent},
	{path: '/login', name: 'Login', component: LoginComponent},
    {path: '/register', name: 'Register', component: RegisterComponent},
    { path: '/profile', name: 'Profile', component: ProfileComponent },
	{path: '/**', redirectTo: ['Home']}
])
export class AppComponent {

    constructor(private authService: AuthService, private router: Router) {

	} 

	authenticated() {
        return tokenNotExpired();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/Home']);
    }
}