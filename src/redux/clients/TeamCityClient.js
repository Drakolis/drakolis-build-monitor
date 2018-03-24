import Client from 'node-rest-client';
import config from '../../config/config'

export default class TeamCityClient {

    client;

    constructor(authParams){
        this.client = new Client.Client(authParams || config.connectionSettings.authData);
        this.client.registerMethod("getBuildsOfType", config.connectionSettings.url + "/app/rest/2017.2/builds?buildType=${buildType}", "GET");
        this.client.registerMethod("getBuildData", config.connectionSettings.url + "/app/rest/2017.2/builds/${buildLocator}", "GET");
        this.client.registerMethod("getTestForBuild", config.connectionSettings.url  + "/app/rest/2017.2/builds/${buildLocator}/testOccurrences", "GET");
        this.client.registerMethod("getChangeData", config.connectionSettings.url + "/app/rest/2017.2/changes/${changeLocator}", "GET");
    }

    getBuildsOfType(buildType) {
        let args = {
            path: {"buildType": buildType}
        };

        this.client.methods.getBuildsOfType(args, (data, response) => {
            if (config.appSettings.debug) console.log(data);
            if (config.appSettings.debug) console.log(response);
        });
    }

    getBuildData(){

    }

    getTestForBuild(){

    }

    getChangeData(){

    }
}