import {Injectable} from "angular2/core";
import {Http, Headers} from 'angular2/http';

import {Observable} from 'rxjs/Observable';

import {ConfigService} from './config.service';
import {BackendService} from './backend.service';
import {Config} from '../config';

@Injectable()
export class AuthService {
    private config: Config;
    private oauth2TokenEndpointUrl: string;

    private authenticated: boolean = false;
    private token: string;
    private expires: any = 0;
    private expiresTimerId: any = null;

    constructor(private configService: ConfigService, private backendService: BackendService, private http: Http) {
        //config will be updated whenever a new config is pushed 
        configService.configStream.subscribe(updatedConfig => {
            this.config = updatedConfig
            this.oauth2TokenEndpointUrl = `${this.config.backendProtocol}://${this.config.backendHost}:${this.config.backendPort}/${this.config.backendRoot}${this.config.backendAuthEndpoint}`;
        });
        configService.load();  
    }

    loginPasswordFlow(email: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');

        let body = `grant_type=password&client_id=${this.config.clientId}&client_secret=not_required&username=${email}&password=${password}`;
        return this.http.post(this.oauth2TokenEndpointUrl, body, { headers: headers })
            .map(response => response.json())
            .map(respAsJson => {
                this.token = respAsJson.access_token;
                localStorage.setItem('id_token', this.token);
                let expiresSeconds = Number(respAsJson.expires_in) || 1800;
                if (this.token) {
                    this.authenticated = true;
                }
                this.startExpiresTimer(expiresSeconds);
                this.expires = new Date();
                this.expires = this.expires.setSeconds(this.expires.getSeconds() + expiresSeconds);

                this.backendService.loadRoot().subscribe(
                    () => {} 
                );
                
            });
    }

    logout() {
        localStorage.removeItem('id_token');
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
    }

    getSession() {
        return {authenticated: this.authenticated, token: this.token, expires: this.expires};
    }

    private startExpiresTimer(seconds:number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            console.log('Session has expired');
            this.logout();
        }, seconds * 1000);
        console.log('Token expiration timer set for', seconds, "seconds");
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }
}