import React, { Component } from 'react';

<<<<<<< HEAD
class Button extends Component{
    constructor(props){
        super(props);
    }
    render(){
    return <button className="btn btn-lg btn-dark m-2" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText}</button>;
=======
class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <button className="btn btn-lg btn-dark" value={this.props.value} onClick={this.props.handleClick}>{this.props.buttonText}</button>;
>>>>>>> 17b25be301f5958ea926e1e09d7c5f7da281526b
    }
}
export default Button;