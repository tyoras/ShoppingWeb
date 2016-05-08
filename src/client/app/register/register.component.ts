import {Component} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

import {Router, Location} from 'angular2/router';

import {RegisterUserService} from '../common/service/register-user.service';
import {User} from '../common/user';

@Component({
    selector: 'register',
    templateUrl: 'app/register/register.component.html',
    styleUrls: ['app/register/register.component.css'],
    directives: [FORM_DIRECTIVES]
})
export class RegisterComponent {

    private registerForm: ControlGroup;

    constructor(fb: FormBuilder, private router: Router, private location: Location, private registerService: RegisterUserService) {
        this.registerForm = fb.group({
			name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    registerUser(value: any) {
		let userToCreate: User = new User(value);
		userToCreate.password = value.password;
		this.registerService.register(userToCreate)
			.subscribe(
				() => this.router.navigate(['../Login']),
            	(error) => console.error(error) //TODO better handling of the error
			);
    }

}