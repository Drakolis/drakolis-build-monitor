import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import BuildItem from "./BuildItem";

export default class BuildGroupItem extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h1>{this.props.name}</h1>
                    </Col>
                </Row>
                <Row className='pb-3'>
                    {this.props.builds.map(build =>
                        <BuildItem build={build} id={this.props.name+'_'+build} key={this.props.name+'_'+build}/>
                    )}
                </Row>
            </div>
        );
    }
}