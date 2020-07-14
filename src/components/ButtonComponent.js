import React, { Component } from 'react';

class ButtonComponent extends Component {
    render() {
        if (this.props.btnType === 'modalOpen') {
            return <button className="btn btn-primary" type="button" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText}</button>;
        }
        else if (this.props.btnType === 'modalBuy') {
            return <button className="btn btn-success" type="button" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText}</button>;
        } else {
            return <button className="btn btn-lg btn-dark" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText} </button>;
        }
    }
}
export default ButtonComponent;