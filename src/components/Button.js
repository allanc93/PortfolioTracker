import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <button className="btn btn-lg btn-dark m-2" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText}</button>;
    }
}
export default Button;