import React, { Component } from 'react';
import ShareInfo from './ShareInfo';
import axios from 'axios';
import '../bootstrap.min.css';

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
            <div className="share-table bg">
                <table id="portfolio-table" className="table table-striped mx-auto my-5 w-75">
                    <thead className="thead-dark">
                        <tr>
                            <th>Company Name</th>
                            <th>Symbol</th>
                            <th>Shares held</th>
                            <th>Bought price</th>
                            <th>Current price</th>
                            <th>Total value</th>
                            <th>Net profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="portfolioTable"></tr>
                    </tbody>
                </table>
                <div id="loading" className="text-center">
                    <div class="spinner-border text-secondary " role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    convertPortfolioDataToTableView() {
        let tableData = "";
        let element = this.state.portfolioData;
        let portfolioTable = document.getElementById("portfolio-table");
        let row = portfolioTable.insertRow(1);
        var rows = portfolioTable.getElementsByTagName("tr")
        row.insertCell(0).innerHTML = element.name;
        row.insertCell(1).innerHTML = element.symbol;
        row.insertCell(2).innerHTML = element.shares;
        row.insertCell(3).innerHTML = `$${element.bought}`;
        row.insertCell(4).innerHTML = `$${element.current}`;
        row.insertCell(5).innerHTML = `$${element.total}`;
        row.insertCell(6).innerHTML = `$${element.profit}`;

        if (rows.length - 2 === this.state.shareNumber) {
            document.getElementById('loading').style.display = 'none';
        }
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
            const APIlink = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${element.token}&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact`
            const resp = await axios.get(APIlink);
            let responseData = Object.entries(resp.data);
            // complile data from the portfolio json and the API call into one object
            this.setState({
                portfolioData: {
                    name: element.name,
                    symbol: element.token,
                    shares: element.quantity,
                    bought: element.bought,
                    current: responseData[0][1]['05. price'],
                    total: element.quantity * responseData[0][1]['05. price'],
                    profit: element.quantity * responseData[0][1]['05. price'] - (element.quantity * element.bought)
                }
            });
            this.convertPortfolioDataToTableView();
        });
    }
}

export default PortfolioDisplay;