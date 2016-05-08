export function myUtil() {
	(<any>this.SYSTEM_CONFIG_DEV.paths)['angular2-jwt'] = `${this.APP_BASE}node_modules/angular2-jwt/angular2-jwt`;
}
