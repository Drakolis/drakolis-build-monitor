var Client = require('node-rest-client'),
    config = require('../../config/config');

module.exports = class TeamCityClient {

    constructor(authParams){
        this.client = new Client.Client(authParams || config.connectionSettings.authData);
        this.client.registerMethod("getBuildsOfType", config.connectionSettings.url + config.connectionSettings.authType + "/app/rest/2017.2/builds?buildType=${buildType}&count=1", "GET");
        this.client.registerMethod("getBuildData", config.connectionSettings.url + config.connectionSettings.authType + "/app/rest/2017.2/builds/${buildLocator}", "GET");
        this.client.registerMethod("getTestForBuild", config.connectionSettings.url  + config.connectionSettings.authType + "/app/rest/2017.2/builds/${buildLocator}/testOccurrences", "GET");
        this.client.registerMethod("getChangeData", config.connectionSettings.url + config.connectionSettings.authType + "/app/rest/2017.2/changes/${changeLocator}", "GET");
    }

    wrapCallback(callBack) {
        return (data, response) => {
            if (config.appSettings.debug)
            {
                console.log("DATA:");
                console.log(JSON.stringify(data));
            }
            callBack(data);
        };
    }

    getBuildsOfType(buildType, callBack) {
        let args = {
            path: {"buildType": buildType}
        };

        this.client.methods.getBuildsOfType(args, this.wrapCallback(callBack));
    }

    getBuildData(buildId, callBack){
        let args = {
            path: {"buildLocator": buildId}
        };
        this.client.methods.getBuildData(args, this.wrapCallback(callBack));
    }

    getTestForBuild(buildId, callBack){
        let args = {
            path: {"buildLocator": buildId}
        };

        this.client.methods.getTestForBuild(args, this.wrapCallback(callBack));
    }

    getChangeData(changeId, callBack){
        let args = {
            path: {"changeLocator": changeId}
        };

        this.client.methods.getChangeData(args, this.wrapCallback(callBack));
    }

    callActionByName(action, param, callback){
        switch (action) {
            case "getBuildsOfType":
                client.getBuildsOfType(param, callback);
                break;
            case "getBuildData":
                client.getBuildData(param, callback);
                break;
            case "getTestForBuild":
                client.getTestForBuild(param, callback);
                break;
            case "getChangeData":
                client.getChangeData(param, callback);
                break;
            default:
                callback(null);
                break;
        }
    }
};