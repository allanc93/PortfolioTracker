import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            inputField: 0
        };
    }

    handleChange = (event) => {
        this.setState({
            inputField: Number(event.target.value)
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            inputField: 0
        });
        alert(`You have purchased ${this.state.inputField} shares in ${this.props.title}`);
    }

    render() {
        let currentCurrency = '';
        if (this.props.currency === 'USD') {
            currentCurrency = `\u0024`;
        }
        else if (this.props.currency === 'GBP') {
            currentCurrency = `\u00A3`//'&#163;'
        }
        else if (this.props.currency === 'EUR') {
            currentCurrency = `\u20AC`//'&#128;'
        }
        else {
            currentCurrency = `\u00A4`//'&#164;'
        }

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                id={this.props.id}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title} ({this.props.currency}: {currentCurrency})
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>{this.props.modalData.symbol}</h4>
                    <p>
                        Open: {currentCurrency}{this.props.modalData.open} <br />
                        High: {currentCurrency}{this.props.modalData.high} <br />
                        Low: {currentCurrency}{this.props.modalData.low} <br />
                        Price: {currentCurrency}{this.props.modalData.price} <br />
                        Volume: {this.props.modalData.volume} <br />
                        Latest Trading Day: {this.props.modalData.latestTradingDay} <br />
                        Previous Close: {currentCurrency}{this.props.modalData.previousClose} <br />
                        Change: {currentCurrency}{this.props.modalData.change}/{this.props.modalData.changePercent}
                    </p>

                    <p>Buying <span className="font-weight-bold">{this.state.inputField}</span> shares in {this.props.title} would cost <span className="font-weight-bold">{currentCurrency}{((this.props.modalData.price) * (this.state.inputField)).toFixed(2)}</span> (at {currentCurrency}{this.props.modalData.price} each). </p>

                    <form onSubmit={this.handleSubmit} className="text-center">
                        <div className="form-group d-flex flex-column align-items-center">
                            <label for="amount-input">Enter an amount</label>
                            <input type="number" className="form-control w-75" id="amount-input" value={this.state.inputField} onChange={this.handleChange} />
                        </div>
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