import axios from 'axios';
import {TEAMCITY_API_REQUEST, TEAMCITY_API_FAIL, TEAMCITY_API_SUCCESS} from "../ActionTypes"
import config from "../../config";

const API_HOST = config.appSettings.serverUrl + ":" + config.appSettings.serverPort + "/";
const getBuildsOfTypeUrl = API_HOST + "?request=getBuildsOfType&param=";
const getBuildDataUrl = API_HOST + "?request=getBuildData&param=";
const getTestForBuildUrl = API_HOST + "?request=getTestForBuild&param=";
const getChangeDataUrl = API_HOST + "?request=getChangeData&param=";

export default function getBuildData(buildType) {
    const requestBuildsUrl = getBuildsOfTypeUrl+buildType;

    return (dispatch) => {
        dispatch({
            type: TEAMCITY_API_REQUEST,
            payload: {
                buildType: buildType
            }
        });
        setTimeout(() => {
            axios.get(requestBuildsUrl)
                .then(function (response) {
                    let buildData = response.data.builds.build.$;
                    let buildId = buildData.id;
                    axios.get(getBuildDataUrl+buildId).then(function (response) {
                        buildData = response.data.build;
                        if(config.appSettings.debug) console.log(buildData);
                        let testData = null;
                        let commitData = null;

                        if(buildData.lastChanges) {
                            let commitId = buildData.lastChanges.change.$.id;
                            axios.get(getChangeDataUrl + commitId).then(function (response) {
                                commitData = response.data;
                                if(config.appSettings.debug) console.log(commitData);

                                axios.get(getTestForBuildUrl + buildId).then(function (response) {
                                    testData = response.data;
                                    if(config.appSettings.debug) console.log(testData);
                                    dispatch({
                                        type: TEAMCITY_API_SUCCESS,
                                        payload: {
                                            buildType: buildType,
                                            buildData: buildData,
                                            testData: testData.testOccurrences.testOccurrence ? testData : null,
                                            commitData: commitData
                                        }
                                    });
                                });
                            });
                        } else {
                            axios.get(getTestForBuildUrl + buildId).then(function (response) {
                                testData = response.data;
                                if(config.appSettings.debug) console.log(testData);
                                dispatch({
                                    type: TEAMCITY_API_SUCCESS,
                                    payload: {
                                        buildType: buildType,
                                        buildData: buildData,
                                        testData: testData.testOccurrences.testOccurrence ? testData : null,
                                        commitData: commitData
                                    }
                                });
                            });
                        }


                    });
                })
                .catch(error => {
                    if(config.appSettings.debug) console.log(error);
                    dispatch({
                        type: TEAMCITY_API_FAIL,
                        payload: {
                            buildType: buildType,
                            error: error.description
                        }
                    })
                });
        }, 1000);
    }
}