import {EnvConfig} from './env-config.interface';

const DevConfig: EnvConfig = {
  ENV: 'DEV',
  client_id : 'd1f53029-9732-4d00-ba8e-0304020bef6b',
  backend : {
    protocol : 'https',
    host : 'shopping-app.io',
    port : 8443,
    root : 'shopping/rest',
    api_endpoint : '/api',
    auth_endpoint : '/auth/token'
  }
};

export = DevConfig;
