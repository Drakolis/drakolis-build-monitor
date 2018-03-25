import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class ButtonWithPopover extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        console.log("toggle");
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <span className="ml-1">
                <Button id={this.props.id} onClick={this.toggle}>
                    {this.props.name}
                </Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.props.id} toggle={this.toggle}>
                    {this.props.header &&  <PopoverHeader>{this.props.header}</PopoverHeader>}
                    <PopoverBody>{this.props.children}</PopoverBody>
                </Popover>
            </span>
        );
    }
}