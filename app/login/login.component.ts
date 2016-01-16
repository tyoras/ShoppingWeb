import {Component, OnInit, OnDestroy} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common'
import {Router, RouteParams} from 'angular2/router';

import {Subscription} from 'rxjs/Subscription';

import {ConfigService} from '../common/service/config.service';
import {Config} from '../common/config';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class LoginComponent implements OnInit, OnDestroy {
    private config: Config;
    private configSubscription: Subscription<Config>; //useful to unsubscribe the config stream
    private loginForm: ControlGroup;

    constructor(fb: FormBuilder, private configService: ConfigService) {
        //config will updated whenever a new config is pushed 
        this.configSubscription = configService.configStream.subscribe(updatedConfig => this.config = updatedConfig);
        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    ngOnInit() {
        this.configService.load(); 
    }

    doLogin(event) {

        event.preventDefault();
    }

    ngOnDestroy() {
        if (this.configSubscription) {
            this.configSubscription.unsubscribe();
        }
    }
}