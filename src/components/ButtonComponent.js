import React, { Component } from 'react';

class ButtonComponent extends Component {
    render() {
        // Checks for btnType prop
        if (this.props.btnType === 'modalOpen') {
            return <button className="btn btn-primary" type="button" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText}</button>;
        } else {
            return <button className="btn btn-lg btn-dark" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText} </button>;
        }
    }
}
export default ButtonComponent;