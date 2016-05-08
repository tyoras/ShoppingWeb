import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';

import {AppComponent} from './app/app.component';
import {ConfigService} from './app/common/service/config.service';
import {AuthService} from './app/common/service/auth.service';
import {BackendService} from './app/common/service/backend.service';
import {UserService} from './app/common/service/user.service';
import {RegisterUserService} from './app/common/service/register-user.service';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
	provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
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
	}) 
	
]);
