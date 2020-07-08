import React, { Component } from 'react';
import axios from 'axios';
import '../bootstrap.min.css';
import TableComponent from './TableComponent';

class PortfolioDisplay extends Component {

    constructor() {
        super();
        this.state = {
            portfolioData: [],
            shareNumber :0
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
                <TableComponent tableData={this.state.portfolioData}/>
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
        /*data.portfolio.forEach(async (element) => {
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
                    current: Number(responseData[0][1]['05. price']),
                    total: element.quantity * element.bought,
                    profit: (element.quantity * Number(responseData[0][1]['05. price'])) - (element.quantity * element.bought)
                }
            });
            
            this.convertPortfolioDataToTableView();
        });*/


        this.setState({
            portfolioData: [{
                name: "Apple Inc",
                symbol: "AAPL",
                shares: 5,
                bought: 350,
                current: 400,
                total: 1750,
                profit: 99999
            },{
                name: "Google",
                symbol: "GOOGL",
                shares: 2,
                bought: 500,
                current: 550,
                total: 1100,
                profit: 100
            }]

        });
    }
}

export default PortfolioDisplay;