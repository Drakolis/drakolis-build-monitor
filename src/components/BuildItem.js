import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardFooter, Col } from 'reactstrap';
import ButtonWithPopover from "./ButtonWithPopover";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getBuildData from '../redux/actions/GetBuildData';
import config from '../config';
import {find} from 'lodash';

class BuildItem extends Component {

    tick = () => {
        if (config.appSettings.debug) console.log("What? "+this.props.build+" is updating!");
        this.runGetBuildData();
    };

    componentDidMount() {
        this.tick();
        this.interval = setInterval(this.tick, config.appSettings.updateTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    runGetBuildData = () => {
        this.props.getBuildData(this.props.build);
    };


    render() {
        const buildData = find(this.props.buildData, build => build.type === this.props.build) || null;
        const nvl = (value, valueIfNull="???") => {
        return value || valueIfNull;
        };
        const buildFailed = nvl(buildData.buildState, 'SUCCESS') !== 'SUCCESS';
        if(config.appSettings.debug) console.log(buildData);
        return (
            <Col sm="3" className='py-1'>
                <Card inverse color={nvl(buildData.buildStateColor, 'secondary')}
                      className={buildFailed ? 'animated infinite shake' : ''}>
                    <CardBody>
                        <CardTitle tag="h3">
                            {nvl(buildData.name, this.props.build)}
                            </CardTitle>
                        <CardSubtitle>
                            <strong>
                                {nvl(buildData.projectName)}
                            </strong>
                        </CardSubtitle>
                        <CardText><em>{nvl(buildData.buildStateMessage)}</em></CardText>
                        {/*<ButtonWithPopover name="Tests" id={"testsButton_"+this.props.build}>Huy</ButtonWithPopover>*/}
                        {buildData.lastCommit && buildData.lastCommit.comment &&
                            <ButtonWithPopover name="Last Commit" header={nvl(buildData.lastCommit.comment)} id={"commitButton_"+this.props.id}><strong>by: </strong>{nvl(buildData.lastCommit.user)}</ButtonWithPopover>
                        }
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

function mapStateToProps (state) {
    return {
        buildData: state.buildData.builds
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getBuildData: bindActionCreators(getBuildData, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BuildItem);