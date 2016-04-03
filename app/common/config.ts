export class Config {
    clientId: string;
    backendProtocol: string;
    backendHost: string;
    backendPort: number;
    backendRoot: string;
    backendApiEndpoint: string;
    backendAuthEndpoint: string;

    constructor(configAsJson:any) {
        this.clientId = configAsJson.client_id;
        let backend = configAsJson.backend;
        this.backendProtocol = backend.protocol;
        this.backendHost = backend.host;
        this.backendPort = backend.port;
        this.backendRoot = backend.root;
        this.backendApiEndpoint = backend.api_endpoint;
        this.backendAuthEndpoint = backend.auth_endpoint;
    }   
}