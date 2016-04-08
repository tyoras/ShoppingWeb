import {Headers} from 'angular2/http';

import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

import {BackendService} from './backend.service';
import {APILink} from '../api-link';

interface ApiCallback {
    <T>(link: string): Observable<T>
}

export class ApiService {
    private apis: APILink[];
    protected acceptHeaders: Headers = new Headers({ 'Accept': 'application/json' });

    constructor(private apiRel: string, protected authHttp: AuthHttp, protected backend: BackendService) {
        if (!tokenNotExpired()) {
            console.error("Trying to instanciate API Service without valid token");
        }
    }

    loadRoot(): Observable<any> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return this.authHttp.options(this.backend.getLink(this.apiRel), { headers: headers })
            .map(response => response.json())
            .map(rootAsJson => this.parseRoot(rootAsJson));
    }

    private parseRoot(rootAsJson: any) {
        this.apis = [];
        for (var link of rootAsJson.links) {
            this.apis.push(new APILink(link));
        }

    }

    /**
     * ensure root is loaded before searching API link to use
     */
    requestAPI<T>(rel: string, replacements: any, request: ApiCallback): Observable<T> {
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
        console.log("link is "+link)
        return link.replace(/%7B\w+%7D/g, placeholder => { console.log("found : " + placeholder); return replacements[placeholder] || placeholder; });
    }
}