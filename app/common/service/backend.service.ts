import {Injectable} from "angular2/core";
import {Http, Headers} from 'angular2/http';

import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

import {ConfigService} from './config.service';
import {Config} from '../config';
import {APILink} from '../api-link';

@Injectable()
export class BackendService {
	private config: Config;
    private rootEndpointUrl: string;
    private connectedUserId: string;
    private apis: APILink[] = [];
    private cachedRoots = {};

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
		return this.authHttp.options(this.rootEndpointUrl, { headers: headers })
			.map(response => response.json())
			.map(rootAsJson => this.parseRoot(rootAsJson));
    }

    private parseRoot(rootAsJson: any) {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		this.connectedUserId = rootAsJson.connectedUserId;
		this.apis = [];
		for (var link of rootAsJson.links) {
			this.apis.push(new APILink(link));
			let linkRel = link.rel;
			if (linkRel !== "self") {
				this.authHttp.options(this.getLink(linkRel), { headers: headers })
					.map(response => response.json())
					.subscribe(r => {
						this.cachedRoots[linkRel] = [];
						for (var l of r.links) {
							this.cachedRoots[linkRel].push(new APILink(l));
							
						}	
					});
			}
		}

    }

    getLink(rel: string) : string {
		return this.apis.filter(link => link.rel === rel)[0].href;
    }

    getRootByRel(rel: string): APILink[] {
		return this.cachedRoots[rel];
    }

    getConnectedUserId() : string {
		return this.connectedUserId;
    }
}