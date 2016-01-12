import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {LoginComponent} from './login/login.component';

@Component({
    selector: 'shopping-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/login', name: 'Login', component: LoginComponent}
])
export class AppComponent { }