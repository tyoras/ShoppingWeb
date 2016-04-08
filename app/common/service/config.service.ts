import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Config} from '../config';

@Injectable()
export class ConfigService {
    configStream: Observable<Config>;
    private configObserver: any;
    private cachedConfig: Config;

    constructor(private http: Http) {
        this.configStream = new Observable(observer => this.configObserver = observer).share();
    }
    
    load() {
        if (!this.cachedConfig) {
            this.http.get('config.json')
                .map(response => response.json())
                .subscribe(configAsJson => {
                    this.cachedConfig = new Config(configAsJson);
                    this.configObserver.next(this.cachedConfig);
                }, error => console.log("Unable to load config"));
        } else {
            this.configObserver.next(this.cachedConfig);
        }
    }  
}