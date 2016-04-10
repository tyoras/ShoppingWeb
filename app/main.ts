import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

import {AuthHttp, AuthConfig} from 'angular2-jwt';

import {AppComponent} from './app.component';
import {ConfigService} from './common/service/config.service';
import {AuthService} from './common/service/auth.service';
import {BackendService} from './common/service/backend.service';
import {UserService} from './common/service/user.service';
import {RegisterUserService} from './common/service/register-user.service';

bootstrap(AppComponent, [
	ROUTER_PROVIDERS, 
	HTTP_PROVIDERS, 
	ConfigService, 
	AuthService,
	BackendService,
	UserService,
	RegisterUserService, 
	provide(AuthHttp, {
		useFactory: (http) => {
			return new AuthHttp(new AuthConfig(), http);
		}, 
		deps: [Http]
	}), 
	
]);