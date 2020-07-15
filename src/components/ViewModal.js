import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PortfolioManager from './PorfolioManager';
import DropdownComponent from './DropdownComponent';

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.PortfolioManager = new PortfolioManager(this.refreshPortfolios);
        // inputField state stores the data which is typed into the number input
        this.state = {
            inputField: 0,
            currentPortfolio: '',
            portfolios: []
        };
    }

    componentDidMount() {
        this.refreshPortfolios();
    }

    async refreshPortfolios() {
        let x = await this.PortfolioManager.getPortfolioList();
        this.setState({
            portfolios: x,
            currentPortfolio: x[0]
        });
    }

    // When event occurs, update the inputField state to reflect what has been typed
    handleChange = (event) => {
        this.setState({
            inputField: Number(event.target.value)
        });
    }

    // When the form is submitted, update state so that the form is empty after submission
    // Alert what shares user has purchased
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            inputField: 0
        });
        if (this.state.inputField > 0) {
            this.PortfolioManager.editPortfolio(this.state.currentPortfolio, this.props.title, this.props.id, this.state.inputField, this.props.modalData.price);
            alert(`You have purchased ${this.state.inputField} shares in ${this.props.title}`);
        }else{
            alert("Can't buy less than 1 share!");
        }
    }

    handleDropDownChange() {
        this.setState({
            currentPortfolio: document.getElementById('portfolio-selector').value
        });
    }

    render() {
        // Checks the current currency passed via currency prop
        // Assigns unicode values for the symbols
        let currentCurrency = '';
        if (this.props.currency === 'USD') {
            currentCurrency = `\u0024`;
        }
        else if (this.props.currency === 'GBP') {
            currentCurrency = `\u00A3`;
        }
        else if (this.props.currency === 'EUR') {
            currentCurrency = `\u20AC`;
        }
        else {
            currentCurrency = `\u00A4`;
        }

        return (
            <Modal
                // Retrieve props
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {/* Display company name and currency info */}
                        {this.props.title} ({this.props.currency}: {currentCurrency})
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* Display company symbol */}
                    <h4>{this.props.modalData.symbol}</h4>
                    <p>
                        {/* Display share data relating to company */}
                        Open: {currentCurrency}{this.props.modalData.open} <br />
                        High: {currentCurrency}{this.props.modalData.high} <br />
                        Low: {currentCurrency}{this.props.modalData.low} <br />
                        Price: {currentCurrency}{this.props.modalData.price} <br />
                        Volume: {this.props.modalData.volume} <br />
                        Latest Trading Day: {this.props.modalData.latestTradingDay} <br />
                        Previous Close: {currentCurrency}{this.props.modalData.previousClose} <br />
                        Change: {currentCurrency}{this.props.modalData.change}/{this.props.modalData.changePercent}
                    </p>

                    {/* Updates on the fly to show total cost */}
                    <p>Buying <span className="font-weight-bold">{this.state.inputField}</span> shares in {this.props.title} would cost <span className="font-weight-bold">{currentCurrency}{((this.props.modalData.price) * (this.state.inputField)).toFixed(2)}</span> (at {currentCurrency}{this.props.modalData.price} each). </p>
                    {/* Form is submitted to the handleSubmit event handler */}
                    <form onSubmit={this.handleSubmit} className="text-center">
                        <div className="form-group d-flex flex-column align-items-center">
                            <label htmlFor="amount-input">Enter an amount</label>
                            {/* Input field value is equal to the current value of the inputField state (controlled component) */}
                            {/* When a change occurs handleChange event handler is called */}
                            <input type="number" min="0" className="form-control w-75" id="amount-input" value={this.state.inputField} onChange={this.handleChange} />
                        </div>
                        <DropdownComponent handleChange={this.handleDropDownChange} id="portfolio-selector" menuData={this.state.portfolios} />
                        <button type="submit" className="btn btn-success w-50">
                            Buy
                        </button>
                    </form>




                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ViewModal;