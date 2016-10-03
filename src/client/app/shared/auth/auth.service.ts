import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Config } from '../config/env.config';
import { AUTH_TOKEN_STORAGE_NAME, CONNECTED_USER_ID_STORAGE_NAME } from '../constants';
import { Helper } from '../helpers';

@Injectable()
export class AuthService {

  private oauth2TokenEndpointUrl: string;
  private expiresTimerId: any = null;

  constructor(private http: Http) {
    let conf = Config.backend;
    this.oauth2TokenEndpointUrl = `${conf.protocol}://${conf.host}:${conf.port}/${conf.root}${conf.auth_endpoint}`;
  }

  loginPasswordFlow(email: string, password: string) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    let body = `grant_type=password&client_id=${Config.client_id}&client_secret=not_required&username=${email}&password=${password}`;
    return this.http.post(this.oauth2TokenEndpointUrl, body, { headers: headers })
      .map(response => response.json())
      .map(respAsJson => {
        if (respAsJson && respAsJson.access_token) {
          let jwt = respAsJson.access_token;
          let decodedJWT = Helper.decodeJWT(jwt);
          localStorage.setItem(CONNECTED_USER_ID_STORAGE_NAME, decodedJWT.sub);
          localStorage.setItem(AUTH_TOKEN_STORAGE_NAME, jwt);
          let expiresSeconds = Number(respAsJson.expires_in) || 600;
          this.startExpiresTimer(expiresSeconds);
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CONNECTED_USER_ID_STORAGE_NAME);
    localStorage.removeItem(AUTH_TOKEN_STORAGE_NAME);
  }

  private startExpiresTimer(seconds: number) {
    if (this.expiresTimerId !== null) {
      clearTimeout(this.expiresTimerId);
    }
    this.expiresTimerId = setTimeout(() => {
      this.logout();
    }, seconds * 1000);
  }
}
