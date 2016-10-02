import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import { Helper } from '../helpers';
import { ACCEPT_CONTENT_TYPE_JSON_HEADERS } from '../constants';
import { Config } from '../config/env.config';
import { User } from './user';

@Injectable()
export class RegisterUserService {

  private rootEndpointUrl: string;

  constructor(private http: Http) {
    let backendConf = Config.backend;
    this.rootEndpointUrl = `${backendConf.protocol}://${backendConf.host}:${backendConf.port}/${backendConf.root}/public/user`;
  }

  register(user: User): Observable<User> {
    let serializedUser: string = JSON.stringify(user);
    let headers: Headers = ACCEPT_CONTENT_TYPE_JSON_HEADERS;
    return this.http.post(this.rootEndpointUrl, serializedUser, { headers: headers })
      .map(this.parseUser);
  }

  parseUser(response: Response): User {
    return Helper.Deserialize(response.text());
  }
}
