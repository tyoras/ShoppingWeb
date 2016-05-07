import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';

import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {Observable} from 'rxjs/Observable';

import {BackendService} from './backend.service';
import {ApiService} from './api.service';
import {User} from '../user';

@Injectable()
export class UserService extends ApiService {

    constructor(authHttp: AuthHttp, backend: BackendService) {
        super('user', authHttp, backend);
    }

    getConnectedUser(): Observable<User> {
        return this.getById(this.backend.getConnectedUserId());
    }

    getById(userId: string): Observable<User> {
        let replacements = { '%7BuserId%7D': userId };

        return this.requestAPI<User>('getById', (link: string) => this.authHttp.get(link, { headers: this.acceptHeader })
                                                                         .map(response => response.json())
                                                                         .map(userAsJson => this.parseUser(userAsJson)), 
            replacements
        );
    }

    getByEmail(email: string): Observable<User> {
        let replacements = { '%7BuserEmail%7D': email };

        return this.requestAPI<User>('getByEmail', (link: string) => this.authHttp.get(link, { headers: this.acceptHeader })
                                                                   .map(response => response.json())
                                                                   .map(userAsJson => this.parseUser(userAsJson)),
            replacements
        );
    }

    create(user: User): Observable<User> {
        let serializedUser: string = JSON.stringify(user);
        return this.requestAPI<User>('create', (link: string) => this.authHttp.post(link, serializedUser, { headers: this.acceptContentTypeHeaders })
                                                                .map(response => response.json())
                                                                .map(userAsJson => this.parseUser(userAsJson))
        );
    }

    update(user: User): Observable<Response> {
        let replacements = { '%7BuserId%7D': user.id };

        let serializedUser: string = JSON.stringify(user);
        return this.requestAPI<Response>('update', (link: string) => this.authHttp.put(link, serializedUser, { headers: this.acceptContentTypeHeaders }), replacements);
    }

    changePassword(userId: string, password: string): Observable<Response> {
        let replacements = { '%7BuserId%7D': userId, '%7BnewPassword%7D': password };

        return this.requestAPI<Response>('changePassword', (link: string) => this.authHttp.put(link, null, { headers: this.acceptContentTypeHeaders }), replacements);
    }

    deleteById(userId: string): Observable<Response> {
        let replacements = { '%7BuserId%7D': userId };

        return this.requestAPI<Response>('getById', (link: string) => this.authHttp.delete(link, { headers: this.acceptHeader }), replacements);
    }

    parseUser(userAsJson : any): User {
        return new User(userAsJson);
    }
}