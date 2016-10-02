// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  ENV?: string;
  client_id: string;
  backend: {
    protocol: string;
    host: string;
    port: number;
    root: string;
    api_endpoint: string;
    auth_endpoint: string;
  };
}

export const Config: EnvConfig = JSON.parse('<%= ENV_CONFIG %>');
