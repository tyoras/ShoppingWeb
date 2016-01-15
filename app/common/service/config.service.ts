import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http'

import {Config} from '../config';

@Injectable()
export class ConfigService {
    private config:Config;

    constructor(private http:Http) { }
    
    get(): Promise<Config> {
        if (!this.config) {
            return new Promise<Config>(
                resolve => {
                    this.load();
                    Promise.resolve(this.config);
                }
            );
        }
        return Promise.resolve(this.config);
    }

    private load() {
        this.http.get('config.json')
            .map(response => response.json())
            .map
            .subscribe(configAsJson => {
                this.config = new Config(configAsJson.json());
            });
    }  
}