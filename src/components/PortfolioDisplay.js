import React, { Component } from 'react';
import axios from 'axios';
import '../bootstrap.min.css';
import TableComponent from './TableComponent';
import APICall from './APICall';
import DropdownComponent from './DropdownComponent';
import PortfolioManager from './PorfolioManager';
import Button from './Button';

class PortfolioDisplay extends Component {

    constructor() {
        super();
        this.state = {
            portfolios: [],
            portfolioData: [],
            shareNumber: 0
        };
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.PortfolioManager = new PortfolioManager();
    }

    async getPortfolios() {
        let x = await this.PortfolioManager.getPortfolioList();
        this.setState({
            portfolios: x
        });
        this.getDataFromJson();
    }

    componentDidMount() {
        this.getPortfolios();
    }

    handleDropDownChange() {
        this.setState({
            portfolioData: []
        });
        this.getDataFromJson();
    }


    render() {
        return (
            <div className="portfolio-display">
                <h1 className="my-4" >My Portfolio</h1>
                <hr className="my-4" />
                <DropdownComponent handleChange={this.handleDropDownChange} id="portfolio-selector" menuData={this.state.portfolios} />
                <TableComponent tableData={this.state.portfolioData} />
                <Button buttonText="test" handleClick={() => {
                    let dummydata = {
                        "name": "Facebook",
                        "token": "FB",
                        "quantity": 5,
                        "bought": 245.07
                    };
                    //this.PortfolioManager.editPortfolio('portfolio2', dummydata);
                    //this.PortfolioManager.getPortfolioData('portfolio1');
                    //this.PortfolioManager.getQuantity('portfolio2', 'FB');
                    //this.PortfolioManager.addPortfolio('portfolio1');
                    this.PortfolioManager.addPortfolio('pls work v2');

                }} />
                {/* <div id="loading" className="text-center">
                    <div class="spinner-border text-secondary " role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> */}
                <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-app.js"></script>
                <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-analytics.js"></script>
            </div>
        );
    }


    async getDataFromJson() {
        // Get basic data from the JSON file about the details of portfolio
        let currentPortfolio = document.getElementById('portfolio-selector').value;
        const JsonFile = `/portfolios/portfolios.json`;
        const resp = await axios.get(JsonFile);

        //console.log(resp);
        //console.log(resp.data);
        //console.log(resp.data.portfolios);
        let testlist = [];
        resp.data.portfolios.forEach(element => {
            if (element[currentPortfolio]) {
                testlist = (element[currentPortfolio]);
            }
        });
        this.getDataFromAPI(testlist);

        this.setState({
            shareNumber: testlist.length
        });
    }

    getDataFromAPI(data) {
        // Use portfolio data to aquire more info about the stocks and shares
        data.forEach(async (element) => {
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