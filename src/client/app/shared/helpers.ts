import { AUTH_TOKEN_STORAGE_NAME } from './constants';

export class Helper {

  public static getAuthToken(): string {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_NAME);
  }

  public static isAuthenticated(): boolean {
    return !!Helper.getAuthToken();
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
