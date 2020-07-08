import React, { Component } from 'react';

class Button extends Component {
    render() {
        return <button className="btn btn-lg btn-dark" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText}</button>;
    }
}
export default Button;