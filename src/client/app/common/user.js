"use strict";
var User = (function () {
    function User(userAsJson) {
        if (userAsJson.id) {
            this.id = userAsJson.id;
        }
        this.name = userAsJson.name;
        this.email = userAsJson.email;
        if (userAsJson.creationDate) {
            this.creationDate = new Date(userAsJson.creationDate);
        }
        if (userAsJson.lastUpdate) {
            this.lastUpdate = new Date(userAsJson.lastUpdate);
        }
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map