import {Injectable} from "angular2/core";
import {Headers} from 'angular2/http';

import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

import {ConfigService} from './config.service';
import {BackendService} from './backend.service';
import {APILink} from '../api-link';
import {User} from '../user';

@Injectable()
export class UserService {
    private apis: APILink[];

    constructor(private authHttp: AuthHttp, private backend: BackendService) {
        if (tokenNotExpired()) {
            console.log("begin to load user root");
            this.apis = this.backend.getRootByRel("user");
            // this.loadRoot().subscribe(
            //     () => console.log("user root loaded"),
            //     error => console.error("error while loading user API root"),
            //     () => console.log("finished to load user root")   
            // );
            if (this.apis) {
                console.log("user apis not empty");
            } else {
                console.log("user apis undifined");
            }
        }
    }

    loadRoot(): Observable<any> {      
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return this.authHttp.options(this.backend.getLink("user"), { headers: headers })
            .map(response => response.json())
            .map(rootAsJson => this.parseRoot(rootAsJson));
    }

    private parseRoot(rootAsJson: any) {
        this.apis = [];
        for (var link of rootAsJson.links) {
            this.apis.push(new APILink(link));
        }

    }

    // getLink(rel: string): Observable<string> {
    //     if (this.apis) {
    //         return Observable.of(this.filterLinkByRel(rel));
    //     } else {
    //         return this.loadRoot().map(() => this.filterLinkByRel(rel));
    //     }
    // }

    getLink(rel: string): string {
        return this.apis.filter(link => link.rel === rel)[0].href;
    }

    getConnectedUser(): Observable<any> {
        return this.getUserById(this.backend.getConnectedUserId());
    }

    getUserById(userId : string): Observable<User> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return this.authHttp.get(this.getLink("getById"), { headers: headers })
            .map(response => response.json())
            .map(userAsJson => this.parseUser(userAsJson));
        // return this.getLink("getById").flatMap(
        //     link => this.authHttp.get(link, { headers: headers })
        //                          .map(response => response.json())
        //                          .map(userAsJson => this.parseUser(userAsJson))
        //  );
    }

    parseUser(userAsJson : any): User {
        return new User(userAsJson);
    }
}