import {Component} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common'
import {Router, RouteParams} from 'angular2/router';

import {ConfigService} from '../common/service/config.service';
import {Config} from '../common/config';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
    directives: [FORM_DIRECTIVES],
    providers: [ConfigService]
})
export class LoginComponent {
    private config:Config;
    private loginForm:ControlGroup;

    constructor(fb: FormBuilder, private _configService: ConfigService) {
        this._configService.get().then(config => this.config = config);
        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    doLogin(event) {
        console.log('form : ');
        console.log(this.loginForm.value);
        console.log('config : ');
        console.log(this.config);
        event.preventDefault();
    }
}