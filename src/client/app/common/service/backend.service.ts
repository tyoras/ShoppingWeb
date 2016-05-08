import {Injectable} from 'angular2/core';
import {Http, Headers, Request, RequestMethod} from 'angular2/http';

import {AuthHttp, tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {Observable} from 'rxjs/Observable';

import {ConfigService} from './config.service';
import {Config} from '../config';
import {APILink} from '../api-link';

@Injectable()
export class BackendService {
	private config: Config;
    private rootEndpointUrl: string;
    private connectedUserId: string;
    private apisRoots: APILink[] = [];

    constructor(private configService: ConfigService, private http: Http, private authHttp: AuthHttp) {
        //config will be updated whenever a new config is pushed 
        configService.configStream.subscribe(updatedConfig => {
            this.config = updatedConfig;
            this.rootEndpointUrl = `${this.config.backendProtocol}://${this.config.backendHost}:${this.config.backendPort}/${this.config.backendRoot}/api`;
            if (tokenNotExpired()) {
            	this.loadRoot();
            }
        });
    }

    loadRoot() : Observable<any> {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
        let request: Request = new Request({
            url: this.rootEndpointUrl,
            method: RequestMethod.Options,
            headers: headers
        });
        return this.authHttp.request(request)
			.map(response => response.json())
			.map(rootAsJson => this.parseRoot(rootAsJson));
    }

    getLink(rel: string): string {
        if (!this.apisRoots || this.apisRoots.length === 0) {
            return null;
        }
        return this.apisRoots.filter(link => link.rel === rel)[0].href;
    }

    getAsyncLink(rel: string): Observable<string> {
        return this.loadRoot().map(() => this.getLink(rel));
    }

    getConnectedUserId(): string {
		return this.connectedUserId;
    }

    getAsyncConnectedUserId(): Observable<string> {
        return this.loadRoot().map(() => this.getConnectedUserId());
    }

    private parseRoot(rootAsJson: any) {
        this.connectedUserId = rootAsJson.connectedUserId;
        this.apisRoots = [];
        for (var link of rootAsJson.links) {
            this.apisRoots.push(new APILink(link));
        }

    }

    
}