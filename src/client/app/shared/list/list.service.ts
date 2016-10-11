import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Helper } from '../helpers';
import { ApiService } from '../api/api.service';
import { List } from './list';

@Injectable()
export class ListService extends ApiService {

  constructor(http: Http) {
    super('list', http);
  }

  getById(listId: string): Observable<List> {
    let replacements = { '%7BlistId%7D': listId };
    let request = (link: string) => this.http.get(link, { headers: this.auth_accept_json() })
      .map(this.parseList);

    return super.requestAPI<List>('getById', request, replacements);
  }

  getLists(): Observable<List[]> {
    return super.getConnectedUserId().flatMap(userId => {
      let replacements = { '%7BownerId%7D': userId };
      let request = (link: string) => this.http.get(link, { headers: this.auth_accept_json() })
        .map(this.parseListArray);

      return super.requestAPI<List[]>('getByOwnerId', request, replacements);
    });
  }

  // getByEmail(email: string): Observable<User> {
  //   let replacements = { '%7BuserEmail%7D': email };
  //   let request = (link: string) => this.http.get(link, { headers: this.auth_accept_json() })
  //     .map(this.parseUser);
  //   return super.requestAPI<User>('getByEmail', request, replacements);
  // }
  //
  // create(user: User): Observable<User> {
  //   let serializedUser: string = JSON.stringify(user);
  //   let request = (link: string) => this.http.post(link, serializedUser, { headers: this.auth_accept_content_type_json() })
  //     .map(this.parseUser);
  //   return super.requestAPI<User>('create', request);
  // }
  //
  // update(user: User): Observable<Response> {
  //   let replacements = { '%7BuserId%7D': user.id };
  //   let serializedUser: string = JSON.stringify(user);
  //   let request = (link: string) => this.http.put(link, serializedUser, { headers: this.auth_accept_content_type_json() });
  //   return super.requestAPI<Response>('update', request, replacements);
  // }
  //
  // changePassword(userId: string, password: string): Observable<Response> {
  //   let replacements = { '%7BuserId%7D': userId, '%7BnewPassword%7D': password };
  //   let request = (link: string) => this.http.put(link, null, { headers: this.auth_accept_content_type_json() });
  //   return super.requestAPI<Response>('changePassword', request, replacements);
  // }

  deleteById(listId: string): Observable<Response> {
    let replacements = { '%7BlistId%7D': listId };
    let request = (link: string) => this.http.delete(link, { headers: this.auth_accept_json() });
    return super.requestAPI<Response>('deleteById', request, replacements);
  }

  parseList(response: Response): List {
    return Helper.Deserialize(response.text());
  }

  parseListArray(response: Response): List[] {
    return Helper.Deserialize(response.text());
  }
}
