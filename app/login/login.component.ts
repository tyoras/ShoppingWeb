import {Component, OnInit, OnDestroy} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES} from 'angular2/common'
import {Router, Location, CanActivate} from 'angular2/router';

import {tokenNotExpired} from 'angular2-jwt';
import {Subscription} from 'rxjs/Subscription';

import {ConfigService} from '../common/service/config.service';
import {Config} from '../common/config';
import {AuthService} from '../common/service/auth.service';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls: ['app/login/login.component.css'],
    directives: [FORM_DIRECTIVES]
})
@CanActivate(() => !tokenNotExpired())
export class LoginComponent implements OnInit, OnDestroy {
    private config: Config;
    private configSubscription: Subscription; //useful to unsubscribe the config stream
    private loginForm: ControlGroup;

    constructor(fb: FormBuilder, private router: Router, private location: Location, private configService: ConfigService, private authService: AuthService) {
        //config will be updated whenever a new config is pushed 
        this.configSubscription = configService.configStream.subscribe(updatedConfig => this.config = updatedConfig);
        this.loginForm = fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    ngOnInit() {
        this.configService.load();
    }

    doLogin(value: any) {
        this.authService.loginPasswordFlow(value.email, value.password)
        .subscribe(
            () => this.router.navigate(['../Home']),
            (error) => console.log(error) //TODO better handling of the error
        );
    }

    ngOnDestroy() {
        if (this.configSubscription) {
            this.configSubscription.unsubscribe();
        }
    }
}