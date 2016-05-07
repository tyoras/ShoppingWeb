"use strict";
var APILink = (function () {
    function APILink(linkAsJson) {
        this.rel = linkAsJson.rel;
        this.href = linkAsJson.href;
    }
    return APILink;
}());
exports.APILink = APILink;
//# sourceMappingURL=api-link.js.map