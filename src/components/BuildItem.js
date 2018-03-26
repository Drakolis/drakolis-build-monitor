import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import ButtonWithPopover from "./ButtonWithPopover";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getBuildData from '../redux/actions/GetBuildData';
import config from '../config';
import {find} from 'lodash';
import Icon from 'react-fa';

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
        const nvl = (value, valueIfNull="") => {
        return value || valueIfNull;
        };
        if(config.appSettings.debug) console.log(buildData);
        return (
            <Col sm="3" className='py-1'>
                <Card inverse color={nvl(buildData.buildStateColor, 'secondary')}
                      className={buildData.buildFailed ? 'animated infinite shake' : ''}>
                    <CardBody>
                        <CardTitle tag="h3">
                            {nvl(buildData.name, this.props.build)}
                            </CardTitle>
                        <CardSubtitle>
                            <strong>
                                {nvl(buildData.projectName)}
                            </strong>
                        </CardSubtitle>
                        <CardText><em><strong>{nvl(buildData.buildStateMessage)}</strong> {buildData.finishDate ? '('+buildData.finishDate+')' : ''}</em></CardText>
                        {buildData.lastCommit && buildData.lastCommit.comment &&
                            <ButtonWithPopover className="mr-1" name={"Last Commit"} header={nvl(buildData.lastCommit.comment)} id={"commitButton_"+this.props.id}><strong>by: </strong>{nvl(buildData.lastCommit.user)}</ButtonWithPopover>
                        }
                        {buildData.tests && buildData.tests.filter(test => test.status === "FAILURE").length>0 &&
                            <ButtonWithPopover className="mr-1" name="Failed Tests" id={"testsButton_" + this.props.build}>
                                <ul className='list-unstyled'>
                                    {buildData.tests.map(test => {
                                        let testnames = test.name.split('.');
                                        return test.status === "FAILURE" && <li>{testnames[testnames.length-1]}</li>
                                    })}
                                </ul>
                            </ButtonWithPopover>
                        }
                        {buildData.buildUrl && <Button href={buildData.buildUrl} target='_blank' secondary><Icon name="share"/> Open in TeamCity</Button>}
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