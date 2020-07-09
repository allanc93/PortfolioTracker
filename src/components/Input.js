import React, { Component } from 'react'

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: ''
        };
    }

    handleSearchQuery = (e) => {
        this.setState({
            searchQuery: e.target.value
        });
    }

    handleSubmit = (e) => {
        alert(`${this.state.searchQuery}`);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Search by company name or symbol: </label>
                <input type="text" value={this.state.searchQuery} onChange={this.handleSearchQuery} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Input
