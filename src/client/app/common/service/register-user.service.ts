import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Observable} from 'rxjs/Observable';

import {ConfigService} from './config.service';
import {Config} from '../config';
import {User} from '../user';


@Injectable()
export class RegisterUserService {
	private config: Config;
    private rootEndpointUrl: string;

    constructor(private configService: ConfigService, private http: Http) {
        //config will be updated whenever a new config is pushed 
        configService.configStream.subscribe(updatedConfig => {
            this.config = updatedConfig;
            this.rootEndpointUrl = `${this.config.backendProtocol}://${this.config.backendHost}:${this.config.backendPort}/${this.config.backendRoot}/public/user`;
        });
        configService.load(); 
    }

	register(user: User): Observable<User> {
        let serializedUser: string = JSON.stringify(user);
        let headers: Headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.rootEndpointUrl, serializedUser, { headers: headers })
			.map(response => response.json())
			.map(userAsJson => this.parseUser(userAsJson));
    }

    parseUser(userAsJson: any): User {
        return new User(userAsJson);
    }
}