import {Component} from 'angular2/core';
import {FormBuilder, Validators, FORM_DIRECTIVES} from 'angular2/common'
import {Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class LoginComponent { 
    constructor(fb: FormBuilder) {
        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    doLogin(event) {
        console.log(this.loginForm.value);
        event.preventDefault();
    }
}