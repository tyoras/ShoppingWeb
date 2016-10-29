import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Helper } from '../helpers';
import { ApiService } from '../api/api.service';
import { Item } from './item';

@Injectable()
export class ItemService extends ApiService {

  constructor(http: Http) {
    super('item', http);
  }

  getById(listId: string, itemId: string): Observable<Item> {
    let replacements = { '%7BlistId%7D': listId, '%7BitemId%7D': itemId };
    let request = (link: string) => this.http.get(link, { headers: this.auth_accept_json() })
      .map(this.parseItem);

    return super.requestAPI<Item>('getById', request, replacements);
  }

  create(listId: string, item: Item): Observable<Item> {
    item.state = 'TO_BUY';
    let replacements = { '%7BlistId%7D': listId };
    let serializedItem: string = JSON.stringify(item);
    let request = (link: string) => this.http.post(link, serializedItem, { headers: this.auth_accept_content_type_json() })
      .map(this.parseItem);
    return super.requestAPI<Item>('create', request, replacements);
  }

  update(listId: string, item: Item): Observable<Response> {
    let replacements = { '%7BlistId%7D': listId, '%7BitemId%7D': item.id };
    let serializedItem: string = JSON.stringify(item);
    let request = (link: string) => this.http.put(link, serializedItem, { headers: this.auth_accept_content_type_json() });
    return super.requestAPI<Response>('update', request, replacements);
  }

  changeItemState(listId: string, item: Item): Observable<Response> {
    let currentState = item.state;
    let newState = 'BOUGHT';
    if (currentState === 'BOUGHT' || currentState === 'CANCELLED') {
      newState = 'TO_BUY';
    }
    item.state = newState;
    return this.update(listId, item);
  }

  cancelItem(listId: string, item: Item): Observable<Response> {
    let currentState = item.state;
    item.state = 'CANCELLED';
    return this.update(listId, item);
  }

  deleteById(listId: string, itemId: string): Observable<Response> {
    let replacements = { '%7BlistId%7D': listId, '%7BitemId%7D': itemId };
    let request = (link: string) => this.http.delete(link, { headers: this.auth_accept_json() });
    return super.requestAPI<Response>('deleteById', request, replacements);
  }

  parseItem(response: Response): Item {
    return Helper.Deserialize(response.text());
  }

}
