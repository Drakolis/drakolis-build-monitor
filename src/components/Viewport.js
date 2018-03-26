import React, { Component } from 'react';
import BuildGroupItem from "./BuildGroupItem";
import BuildStateListener from "./BuildStateListener";
import { Container } from 'reactstrap';
import config from '../config'
import find from "lodash";

export default class Viewport extends Component {
    render() {
        const anyBuildFailed = find(this.props.buildData, elemt => elemt.buildData.buildFailed);
        console.log(anyBuildFailed);
        return (
            <Container fluid className='py-2'>
                {
                    config.connectionSettings.buildGroups.map(group =>
                    <BuildGroupItem key={group.groupId} id={group.groupId} name={group.groupName} builds={group.builds}/> )
                }

                 <BuildStateListener/>
            </Container>
        );
    }
}