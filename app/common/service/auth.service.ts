import {Injectable, EventEmitter} from "angular2/core";
import {Http, Headers} from 'angular2/http';

import {ConfigService} from './config.service';
import {Config} from '../config';

@Injectable()
export class AuthService {
    private config: Config;
    private oauth2TokenEndpointUrl: string;

    private authenticated: boolean = false;
    private token: string;
    private expires: any = 0;
    private userInfo: any = {};
    private expiresTimerId: any = null;

    private locationWatcher = new EventEmitter();

    constructor(private configService:ConfigService, private http:Http) {
        //config will be updated whenever a new config is pushed 
        configService.configStream.subscribe(updatedConfig => {
            this.config = updatedConfig
            this.oauth2TokenEndpointUrl = `${this.config.backendProtocol}://${this.config.backendHost}:${this.config.backendPort}/${this.config.backendRoot}${this.config.backendAuthEndpoint}`;
            console.log(this.oauth2TokenEndpointUrl);
        });
        configService.load();  
    }

    loginPasswordFlow(email: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');

        let body = `grant_type=password&client_id=${this.config.clientId}&client_secret=not_required&username=${email}&password=${password}`;
        this.http.post(this.oauth2TokenEndpointUrl, body, { headers: headers })
            .map(response => response.json())
            .subscribe(respAsJson => {
                console.log(respAsJson);
                this.token = respAsJson.access_token;
                localStorage.setItem('id_token', this.token);
                let expiresSeconds = Number(respAsJson.expires_in) || 1800;
                if (this.token) {
                    this.authenticated = true;
                }
                this.startExpiresTimer(expiresSeconds);
                this.expires = new Date();
                this.expires = this.expires.setSeconds(this.expires.getSeconds() + expiresSeconds);
                this.emitAuthStatus(true);
            }, error => console.log("Unable to get auth token : ", error));
    }

    logout() {
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true);
        console.log('Session has been cleared');
    }

    private emitAuthStatus(success:boolean) {
        this.locationWatcher.emit({success: success, authenticated: this.authenticated, token: this.token, expires: this.expires});
    }

    getSession() {
        return {authenticated: this.authenticated, token: this.token, expires: this.expires};
    }

    /*private fetchUserInfo() {
        if (this.token != null) {
            var headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);
            this.http.get(this.oAuthUserUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(info => {
                    this.userInfo = info;
                }, err => {
                    console.error("Failed to fetch user info:", err);
                });
        }
    }

    getUserInfo() {
        return this.userInfo;
    }

    getUserName() {
        return this.userInfo ? this.userInfo[this.oAuthUserNameField] : null;
    }*/

    private startExpiresTimer(seconds:number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            console.log('Session has expired');
            this.logout();
        }, seconds * 1000); // seconds * 1000
        console.log('Token expiration timer set for', seconds, "seconds");
    }

    subscribe(onNext:(value:any) => void, onThrow?:(exception:any) => void, onReturn?:() => void) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }
}