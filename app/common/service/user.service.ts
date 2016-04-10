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
        return this.getById(this.backend.getConnectedUserId());
    }

    getById(userId: string): Observable<User> {
        let replacements = { "%7BuserId%7D": userId };

        return this.requestAPI("getById", (link: string) => this.authHttp.get(link, { headers: this.acceptHeader })
                                                                         .map(response => response.json())
                                                                         .map(userAsJson => this.parseUser(userAsJson)), 
            replacements
        );
    }

    getByEmail(email: string): Observable<User> {
        let replacements = { "%7BuserEmail%7D": email };

        return this.requestAPI("getByEmail", (link: string) => this.authHttp.get(link, { headers: this.acceptHeader })
                                                                   .map(response => response.json())
                                                                   .map(userAsJson => this.parseUser(userAsJson)),
            replacements
        );
    }

    create(user: User): Observable<User> {
        let headers: Headers = new Headers({ 'Accept': 'application/json' });
        headers.append('Content-Type', 'application/json');

        let serializedUser: string = JSON.stringify(user);
        return this.requestAPI("create", (link: string) => this.authHttp.post(link, serializedUser, { headers: headers })
                                                                .map(response => response.json())
                                                                .map(userAsJson => this.parseUser(userAsJson))
        );
    }

    update(user: User): Observable<User> {
        let headers: Headers = new Headers({ 'Accept': 'application/json' });
        headers.append('Content-Type', 'application/json');
        let replacements = { "%7BuserId%7D": user.id };

        let serializedUser: string = JSON.stringify(user);
        return this.requestAPI("update", (link: string) => this.authHttp.put(link, serializedUser, { headers: headers }), replacements);
    }

    changePassword(userId: string, password: string): Observable<User> {
        let headers: Headers = new Headers({ 'Accept': 'application/json' });
        headers.append('Content-Type', 'application/json');
        let replacements = { "%7BuserId%7D": userId, "%7BnewPassword%7D": password };

        return this.requestAPI("changePassword", (link: string) => this.authHttp.put(link, null, { headers: headers }), replacements);
    }

    deleteById(userId: string): Observable<User> {
        let replacements = { "%7BuserId%7D": userId };

        return this.requestAPI("getById", (link: string) => this.authHttp.delete(link, { headers: this.acceptHeader }), replacements);
    }

    parseUser(userAsJson : any): User {
        return new User(userAsJson);
    }
}