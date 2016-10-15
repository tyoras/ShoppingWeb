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

  create(list: List): Observable<List> {
    return super.getConnectedUserId().flatMap(userId => {
      list.ownerId = userId;
      let serializedList: string = JSON.stringify(list);
      let request = (link: string) => this.http.post(link, serializedList, { headers: this.auth_accept_content_type_json() })
        .map(this.parseList);
      return super.requestAPI<List>('create', request);
    });
  }

  update(list: List): Observable<Response> {
    let replacements = { '%7BlistId%7D': list.id };
    let serializedList: string = JSON.stringify(list);
    let request = (link: string) => this.http.put(link, serializedList, { headers: this.auth_accept_content_type_json() });
    return super.requestAPI<Response>('update', request, replacements);
  }

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
