import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {AppComponent} from './app.component';
import {ConfigService} from './common/service/config.service';
import {AuthService} from './common/service/auth.service';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, ConfigService, AuthService]);