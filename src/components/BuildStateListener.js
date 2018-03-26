import React, { Component } from 'react';
import Sound from "react-sound";
import getBuildData from "../redux/actions/GetBuildData";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import config from '../config';

class BuildStateListener extends Component {
    render() {
        const anyBuildFailed = this.props.buildData.filter(elemt => elemt.buildFailed === true).length>0;
        if(config.appSettings.debug) console.log(this.props.buildData);
        if(config.appSettings.debug) console.log(anyBuildFailed ? "Builds failed!" : "No failed builds.");
        return (
            config.appSettings.alertSound && <Sound
              url={config.appSettings.alertSound}
              playStatus={anyBuildFailed ? Sound.status.PLAYING : Sound.status.STOPPED}
              loop
            />
        );
    }
}

function mapStateToProps (state) {
    if(config.appSettings.debug) console.log(state);
    return {
        buildData: state.buildData.builds
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getBuildData: bindActionCreators(getBuildData, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BuildStateListener);