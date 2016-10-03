import { AUTH_TOKEN_STORAGE_NAME, CONNECTED_USER_ID_STORAGE_NAME } from './constants';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';

const jwtHelper = new JwtHelper();

export class Helper {

  public static getAuthToken(): string {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_NAME);
  }

  public static getConnectedUserId(): string {
    return localStorage.getItem(CONNECTED_USER_ID_STORAGE_NAME);
  }

  public static isAuthenticated(): boolean {
    return !!Helper.getAuthToken();
  }

  public static decodeJWT(jwt: string): any {
    return jwtHelper.decodeToken(jwt);
  }

  public static Deserialize(data: string): any {
    return JSON.parse(data, Helper.ReviveDateTime);
  }

  private static ReviveDateTime(key: any, value: any): any {
    if (typeof value === 'string') {
      let a = /\/Date\((\d*)\)\//.exec(value);
      if (a) {
        return new Date(+a[1]);
      }
    }
    return value;
  }
}
