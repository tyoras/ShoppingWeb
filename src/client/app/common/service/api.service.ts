import {Headers, Request, RequestMethod} from 'angular2/http';

import {AuthHttp, tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {Observable} from 'rxjs/Observable';

import {BackendService} from './backend.service';
import {APILink} from '../api-link';

interface ApiCallback<T> {
    (link: string): Observable<T>;
}

export class ApiService {
    protected acceptHeader: Headers = new Headers({ 'Accept': 'application/json' });
    protected acceptContentTypeHeaders: Headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    private apis: APILink[];

    constructor(private apiRel: string, protected authHttp: AuthHttp, protected backend: BackendService) {
        if (!tokenNotExpired()) {
            console.error('Trying to instanciate API Service without valid token');
        }
    }

    loadRoot(): Observable<any> {
        let url:string = this.backend.getLink(this.apiRel);
        let headers:Headers = new Headers();
        headers.append('Accept', 'application/json');
        let request: Request = new Request({
            url: url,
            method: RequestMethod.Options,
            headers: headers
        });
        return this.authHttp.request(request)
            .map(response => response.json())
            .map(rootAsJson => this.parseRoot(rootAsJson));
    }

    /**
     * ensure root is loaded before searching API link to use
     */
    requestAPI<T>(rel: string, request: ApiCallback<T>, replacements?: any): Observable<T> {
        if (this.apis) {
            return request(this.replacePlaceholders(this.getLink(rel), replacements));
        } else {
            return this.loadRoot().flatMap(() => request(this.replacePlaceholders(this.getLink(rel), replacements)));
        }
    }

    getLink(rel: string): string {
        return this.apis.filter(link => link.rel === rel)[0].href;
    }

    replacePlaceholders(link: string, replacements: any) {
        if (replacements) {
            return link.replace(/%7B\w+%7D/g, placeholder => replacements[placeholder] || placeholder);
        } else {
            return link;
        }
    }

    private parseRoot(rootAsJson: any) {
        this.apis = [];
        for (var link of rootAsJson.links) {
            this.apis.push(new APILink(link));
        }
    }
}