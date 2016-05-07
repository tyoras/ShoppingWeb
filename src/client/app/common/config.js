"use strict";
var Config = (function () {
    function Config(configAsJson) {
        this.clientId = configAsJson.client_id;
        var backend = configAsJson.backend;
        this.backendProtocol = backend.protocol;
        this.backendHost = backend.host;
        this.backendPort = backend.port;
        this.backendRoot = backend.root;
        this.backendApiEndpoint = backend.api_endpoint;
        this.backendAuthEndpoint = backend.auth_endpoint;
    }
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map