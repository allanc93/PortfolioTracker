import React, { Component } from 'react'

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // inputField state stores the data which is typed into the search input
        this.state = {
            inputField: ''
        };
    }

    // When event occurs, update the inputField state to reflect what has been typed
    handleChange = (event) => {
        this.setState({
            inputField: event.target.value
        });
    }

    // When the form is submitted, pass inputField state data back to parent's callback function
    // Update state so that the form is empty after submission
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.inputData(this.state.inputField);
        this.setState({
            inputField: ''
        });
    }

    render() {
        return (
            // Form is submitted to the handleSubmit event handler
            <form onSubmit={this.handleSubmit}>
                <div className="form-group d-flex flex-column align-items-center">
                    <label htmlFor="search-input">Search for a company or symbol</label>
                    {/* Input field value is equal to the current value of the inputField state (controlled component) */}
                    {/* When a change occurs handleChange event handler is called */}
                    <input type="text" className="form-control w-50" id="search-input" aria-describedby="search-help" value={this.state.inputField} onChange={this.handleChange} />
                    <small id="search-help" className="form-text text-muted">(ex. Apple or AAPL)</small>
                </div>
                <button type="submit" className="btn btn-primary">
                    Search&nbsp;
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                        <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                    </svg>
                </button>
            </form>
        )
    }
}

export default SearchInput
