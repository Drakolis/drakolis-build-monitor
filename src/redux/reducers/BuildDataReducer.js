import {TEAMCITY_API_REQUEST, TEAMCITY_API_FAIL, TEAMCITY_API_SUCCESS} from "../ActionTypes"
import config from "../../config";
import {filter, uniqBy} from "lodash";

const initialState = {
    builds: uniqBy(([].concat.apply([],
               config.connectionSettings.buildGroups.map(group => group.builds))
            )
            .map(build => {return {actionType: TEAMCITY_API_REQUEST, type: build}}),
        build => build.type)

};

function buildStateColorSwitcher(actionType, buildState){
    switch (actionType){
        case TEAMCITY_API_SUCCESS:
            if(buildState){
                switch (buildState){
                    case "SUCCESS":
                        return 'success';
                    case "FAILURE":
                        return 'danger';
                    default:
                        return 'warning';
                }
            }
            else
                return 'primary';
        default:
            return 'secondary';
    }
}

export default function buildDataReducer(state = initialState, action) {
    if(config.appSettings.debug) console.log(action);
    let buildType = action.payload && action.payload.buildType ? action.payload.buildType : 0;
    let buildData = {
        actionType: action.type,
        type: buildType,
        name: null,
        projectName: null,
        buildState: null,
        buildFailed: false,
        buildStateColor: buildStateColorSwitcher(action.type),
        buildStateMessage: null,
        buildUrl: null,
        tests: null,
        lastCommit: {
            comment: null,
            user: null,
            url: null,
        },
        finishDate: null
    };

    switch (action.type) {
        /*
        case TEAMCITY_API_FAIL:
        case TEAMCITY_API_REQUEST: {
            return { ...state, builds: filter(state.builds, el=>el.type !== buildType).concat(buildData)};
        }
        */
        case TEAMCITY_API_SUCCESS: {
            buildData.name = action.payload.buildData.buildType.$.name;
            buildData.projectName = action.payload.buildData.buildType.$.projectName;
            buildData.buildState = action.payload.buildData.$.status;
            buildData.buildStateColor = buildStateColorSwitcher(action.type, buildData.buildState);
            buildData.buildStateMessage =  action.payload.buildData.statusText;
            buildData.buildUrl = action.payload.buildData.$.webUrl;
            buildData.finishDate = action.payload.buildData.finishDate;
            buildData.buildFailed = buildData.buildState !== 'SUCCESS';

            if(action.payload.commitData) {
                buildData.lastCommit.comment = action.payload.commitData.change.comment;
                buildData.lastCommit.user = action.payload.commitData.change.$.username;
                buildData.lastCommit.url = action.payload.commitData.change.$.webUrl;
            }
            if(action.payload.testData) {
                buildData.test = action.payload.testData.testOccurrences.testOccurrence.map(test => {return {name: test.name, status: test.status, duration: test.duration}});
            }
            return { ...state, builds: filter(state.builds, el=>el.type !== buildType).concat(buildData)};
        }
        default:
            return { ...state };
    }
}