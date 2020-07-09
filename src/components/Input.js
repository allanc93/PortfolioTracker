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
                <div className="form-group d-flex flex-column align-items-center">
                    <label for="search-input">Search for a company or symbol</label>
                    <input type="text" className="form-control w-50" id="search-input" aria-describedby="search-help" value={this.state.inputField} onChange={this.handleChange} />
                    <small id="search-help" class="form-text text-muted">(ex. Apple or AAPL)</small>
                </div>
                <button type="submit" className="btn btn-primary">
                    Search&nbsp;
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                    </svg>
                </button>
            </form>
        )
    }
}

export default Input
