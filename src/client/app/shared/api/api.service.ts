import { Http, Headers, Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { Config } from '../config/env.config';
import { Helper } from '../helpers';
import { ACCEPT_JSON_HEADER, ACCEPT_CONTENT_TYPE_JSON_HEADERS } from '../constants';
import { APILink } from './api-link';

interface ApiRequest<T> {
  (link: string): Observable<T>;
}

export class ApiService {

  private rootEndpointUrl: string;
  private connectedUserId: string;
  private apiRootLinks: APILink[];
  private apiLinks: APILink[];

  constructor(private apiRel: string, protected http: Http) {
    if (!apiRel) {
      throw new Error('Trying to instanciate API Service without concrete API rel!');
    }
    if (!Helper.getAuthToken()) {
      throw new Error('Trying to instanciate API Service without valid token!');
    }
    let backendConf = Config.backend;
    this.rootEndpointUrl = `${backendConf.protocol}://${backendConf.host}:${backendConf.port}/${backendConf.root}/api`;
  }

  protected getApiRootLinks = (): Observable<APILink[]> => {
    if (this.apiRootLinks && this.apiRootLinks.length > 0) {
      return Observable.of<APILink[]>(this.apiRootLinks);
    }
    return this.loadGlobalRoot();
  }

  protected getConnectedUserId(): Observable<string> {
    if (this.connectedUserId) {
      return Observable.of<string>(this.connectedUserId);
    }
    return this.loadGlobalRoot().map(() => this.connectedUserId);
  }

  protected getApiLinks = (): Observable<APILink[]> => {
    if (this.apiLinks && this.apiLinks.length > 0) {
      return Observable.of<APILink[]>(this.apiLinks);
    }
    return this.loadApiRoot();
  }

  /**
   * ensure root is loaded before searching API link to use
   */
  protected requestAPI<T>(rel: string, request: ApiRequest<T>, replacements?: any): Observable<T> {
    return this.getApiLink(rel)
      .flatMap(link => request(this.replacePlaceholders(link, replacements)));
  }

  protected auth_accept_json(): Headers {
    let headers = new Headers(ACCEPT_JSON_HEADER);
    return this.appendAuthorizationHeader(headers);
  }

  protected auth_accept_content_type_json(): Headers {
    let headers = new Headers(ACCEPT_CONTENT_TYPE_JSON_HEADERS);
    return this.appendAuthorizationHeader(headers);
  }

  private loadGlobalRoot = (): Observable<APILink[]> => {
    let request: Request = new Request({
      url: this.rootEndpointUrl,
      method: RequestMethod.Options,
      headers: this.auth_accept_json()
    });
    return this.http.request(request)
      .map(response => response.json())
      .map(this.parseGlobalRoot);
  }

  private loadApiRoot = (): Observable<APILink[]> => {
    return this.getApiRootLink(this.apiRel)
      .flatMap(url => this.callRootAPI(url));
  }

  private callRootAPI = (url: string): Observable<APILink[]> => {
    let request: Request = new Request({
      url: url,
      method: RequestMethod.Options,
      headers: this.auth_accept_json()
    });
    return this.http.request(request)
      .map(response => response.json())
      .map(this.parseApiRoot);
  }

  private parseGlobalRoot = (rootAsJson: any): APILink[] => {
    this.connectedUserId = rootAsJson.connectedUserId;
    this.apiRootLinks = this.parseRoot(rootAsJson);
    return this.apiRootLinks;
  }

  private parseApiRoot = (rootAsJson: any): APILink[] => {
    this.apiLinks = this.parseRoot(rootAsJson);
    return this.apiLinks;
  }

  private parseRoot(rootAsJson: any): APILink[] {
    let links: APILink[] = [];
    for (var link of rootAsJson.links) {
      links.push(link);
    }
    return links;
  }

  private getApiRootLink = (rel: string): Observable<string> => {
    return this.getLink(this.getApiRootLinks(), rel);
  }

  private getApiLink(rel: string): Observable<string> {
    return this.getLink(this.getApiLinks(), rel);
  }

  private getLink = (root: Observable<APILink[]>, rel: string): Observable<string> => {
    return root.map(links => links.filter(link => link.rel === rel)[0].href);
  }

  private appendAuthorizationHeader(headers: Headers): Headers {
    let authToken = Helper.getAuthToken();
    if (authToken) {
      headers.append('Authorization', 'Bearer ' + authToken);
    }
    return headers;
  }

  private replacePlaceholders(link: string, replacements: any) {
    if (replacements) {
      return link.replace(/%7B\w+%7D/g, placeholder => replacements[placeholder] || placeholder);
    } else {
      return link;
    }
  }

}
