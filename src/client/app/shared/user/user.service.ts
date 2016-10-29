import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Helper } from '../helpers';
import { ApiService } from '../api/api.service';
import { User } from './user';

@Injectable()
export class UserService extends ApiService {

  constructor(http: Http) {
    super('user', http);
  }

  getConnectedUser(): Observable<User> {
    return super.getConnectedUserId().flatMap(foundUserId => this.getById(foundUserId));
  }

  getById(userId: string): Observable<User> {
    let replacements = { '%7BuserId%7D': userId };
    let request = (link: string) => this.http.get(link, { headers: this.auth_accept_json() })
      .map(this.parseUser);

    return super.requestAPI<User>('getById', request, replacements);
  }

  getByEmail(email: string): Observable<User> {
    let replacements = { '%7BuserEmail%7D': email };
    let request = (link: string) => this.http.get(link, { headers: this.auth_accept_json() })
      .map(this.parseUser);
    return super.requestAPI<User>('getByEmail', request, replacements);
  }

  create(user: User): Observable<User> {
    let serializedUser: string = JSON.stringify(user);
    let request = (link: string) => this.http.post(link, serializedUser, { headers: this.auth_accept_content_type_json() })
      .map(this.parseUser);
    return super.requestAPI<User>('create', request);
  }

  update(user: User): Observable<Response> {
    let replacements = { '%7BuserId%7D': user.id };
    let serializedUser: string = JSON.stringify(user);
    let request = (link: string) => this.http.put(link, serializedUser, { headers: this.auth_accept_content_type_json() });
    return super.requestAPI<Response>('update', request, replacements);
  }

  changePassword(userId: string, password: string): Observable<Response> {
    let replacements = { '%7BuserId%7D': userId };
    let request = (link: string) => this.http.put(link, password, { headers: this.auth_accept_json() });
    return super.requestAPI<Response>('changePassword', request, replacements);
  }

  deleteById(userId: string): Observable<Response> {
    let replacements = { '%7BuserId%7D': userId };
    let request = (link: string) => this.http.delete(link, { headers: this.auth_accept_json() });
    return super.requestAPI<Response>('deleteById', request, replacements);
  }

  parseUser(response: Response): User {
    return Helper.Deserialize(response.text());
  }
}
