import {Injectable} from "angular2/core";
import {Headers} from 'angular2/http';

import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

import {ConfigService} from './config.service';
import {BackendService} from './backend.service';
import {ApiService} from './api.service';
import {APILink} from '../api-link';
import {User} from '../user';

@Injectable()
export class UserService extends ApiService {

    constructor(authHttp: AuthHttp, backend: BackendService) {
        super("user", authHttp, backend);
    }

    getConnectedUser(): Observable<User> {
        return this.getUserById(this.backend.getConnectedUserId());
    }

    getUserById(userId: string): Observable<User> {
        let replacements = { "%7BuserId%7D": userId };

        return this.requestAPI("getById", replacements, (link: string) => this.authHttp.get(link, { headers: this.acceptHeaders })
            .map(response => response.json())
            .map(userAsJson => this.parseUser(userAsJson))
        );
    }

    parseUser(userAsJson : any): User {
        return new User(userAsJson);
    }
}