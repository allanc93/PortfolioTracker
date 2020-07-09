import React, { Component } from 'react'

class Input extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            inputField: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            inputField: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.inputData(this.state.inputField);
        this.setState({
            inputField: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Search by company name or symbol: </label>
                <input type="text" value={this.state.inputField} onChange={this.handleChange} />
                <button type="submit">Submit</button>
                <p>Received by CHILD: {this.state.inputField}</p>
            </form>
        )
    }
}

export default Input
