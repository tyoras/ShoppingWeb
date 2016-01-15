export class Config {
    clientId:string;
    backendProtocol:string;

    constructor(configAsJson:any) {
        console.log("const");
        this.clientId = configAsJson.client_id;
        let backend = configAsJson.backend;
        this.backendProtocol = backend.protocol;


    }   
}