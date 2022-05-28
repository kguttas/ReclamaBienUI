import React, { Component } from 'react';
import { Popover, PopoverBody, PopoverHeader  } from 'reactstrap';

class CustomPopover extends Component {
  	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
    	this.state = {
			popoverOpen: false,
		};
  	}

  	toggle() {
		this.setState({
			popoverOpen: !this.state.popoverOpen,
		});
	}

  render() {
    return (
      <span>
		  
			<Popover placement={this.props.placement} isOpen={this.state.popoverOpen} target={this.props.target} toggle={this.toggle} trigger="legacy" delay={0}>
				<PopoverHeader>{this.props.title}</PopoverHeader>
				<PopoverBody>{this.props.text}</PopoverBody>
			</Popover >
      </span>
    );
  }
}

export default CustomPopover;