import React, { Component } from 'react';
import BuildItem from "./BuildItem";
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import TeamCityClient from '../redux/clients/TeamCityClient';


export default class Viewport extends Component {

    client = new TeamCityClient();

    componentWillMount() {
        this.client.getBuildsOfType("NUnit_NUnitLite_Net20");
    }

    render() {
        return (
            <Fabric>
                <BuildItem/>
            </Fabric>
        );
    }
}