import React, { Component } from 'react';
import axios from 'axios';
import '../bootstrap.min.css';
import TableComponent from './TableComponent';
import APICall from './APICall';

class PortfolioDisplay extends Component {

    constructor() {
        super();
        this.state = {
            portfolioData: [],
            shareNumber: 0
        };
    }

    componentDidMount() {
        this.getDataFromJson();
    }

    render() {
        return (
            <div className="portfolio-display">
                <h1 className="my-4" >My Portfolio</h1>
                <hr className="my-4" />
                <TableComponent tableData={this.state.portfolioData} />
                {/* <div id="loading" className="text-center">
                    <div class="spinner-border text-secondary " role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> */}
            </div>
        );
    }


    async getDataFromJson() {
        // Get basic data from the JSON file about the details of portfolio
        const JsonFile = "portfolio.json";
        const resp = await axios.get(JsonFile);
        this.getDataFromAPI(resp.data);

        this.setState({
            shareNumber: resp.data.portfolio.length
        });
    }

    getDataFromAPI(data) {
        // Use portfolio data to aquire more info about the stocks and shares
        data.portfolio.forEach(async (element) => {
            const resp = await APICall('GLOBAL_QUOTE', element.token);
            let responseData = Object.entries(resp.data);
            // complile data from the portfolio json and the API call into one object
            this.setState({
                portfolioData: this.state.portfolioData.concat({
                    name: element.name,
                    symbol: element.token,
                    shares: element.quantity,
                    bought: element.bought,
                    current: Number(responseData[0][1]['05. price']).toFixed(2),
                    total: (element.quantity * element.bought).toFixed(2),
                    profit: ((element.quantity * Number(responseData[0][1]['05. price'])) - (element.quantity * element.bought)).toFixed(2)
                })
            });
        });
    }
}

export default PortfolioDisplay;