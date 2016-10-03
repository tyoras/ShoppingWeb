import { Headers } from '@angular/http';

export const AUTH_TOKEN_STORAGE_NAME: string = 'auth_token';
export const CONNECTED_USER_ID_STORAGE_NAME: string = 'connected_user_id';

export const ACCEPT_JSON_HEADER: Headers = new Headers({ 'Accept': 'application/json' });
export const ACCEPT_CONTENT_TYPE_JSON_HEADERS: Headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
