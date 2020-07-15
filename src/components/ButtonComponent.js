import React, { Component } from 'react';

class ButtonComponent extends Component {
    render() {
        if (this.props.modal) {
            return <button className="btn btn-lg btn-dark" type="button" value={this.props.value} onClick={this.props.handleClick} data-toggle="modal" data-target={this.props.token}>{this.props.buttonText} </button>;
        } else {
            return <button className="btn btn-lg btn-dark" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText} </button>;
        }
    }
}
export default ButtonComponent;