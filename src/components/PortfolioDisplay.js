import React, { Component } from 'react';

import '../bootstrap.min.css';
import TableComponent from './TableComponent';
import APICall from './APICall';
import DropdownComponent from './DropdownComponent';
import PortfolioManager from './PorfolioManager';


class PortfolioDisplay extends Component {

    constructor() {
        super();
        this.state = {
            portfolios: [],
            portfolioData: [],
            shareNumber: 0
        };
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.PortfolioManager = new PortfolioManager(this.refreshPortfolios);
    }

    async refreshPortfolios() {
        let x = await this.PortfolioManager.getPortfolioList();
        this.setState({
            portfolios: x,
            portfolioData: []
        });
        this.getDataFromJson();
    }

    componentDidMount() {
        this.refreshPortfolios();
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
                <div className='d-flex justify-content-center'>
                <svg onClick={() => {
                    let pf = document.getElementById('portfolio-selector').value;
                    if (window.confirm('Are you sure you wish to delete ' + pf + ', this cannot be undone!')) {
                        this.PortfolioManager.removePortfolio(pf);
                    }
                    }} 
                    width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-file-minus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z" />
                    <path fill-rule="evenodd" d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                </svg>

                <DropdownComponent handleChange={this.handleDropDownChange} id="portfolio-selector" menuData={this.state.portfolios} />

                <svg onClick={()=>{
                    var name = window.prompt("New portfolio...", "Portfolio name");
                    if(name){
                        this.PortfolioManager.addPortfolio(name);
                    }
                }}
                
                width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-file-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z" />
                    <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
                </svg>
                </div>

                <TableComponent tableData={this.state.portfolioData} />
                {/* <ButtonComponent buttonText="test" handleClick={() => {
                   
                        let name="Facebook";
                        let token= "FB";
                        let quantity = 5;
                        let price = 250.34;
                    
                    //this.PortfolioManager.editPortfolio('portfolio2',name, token, quantity, price);
                    //this.PortfolioManager.getPortfolioData('portfolio1');
                    //this.PortfolioManager.getQuantity('portfolio2', 'FB');
                    //this.PortfolioManager.addPortfolio('portfolio1');
                    this.PortfolioManager.addPortfolio('pls work v3');
                    this.refreshPortfolios();
                }} /> */}

                <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-app.js"></script>
                <script src="https://www.gstatic.com/firebasejs/7.16.0/firebase-analytics.js"></script>
            </div>
        );
    }


    async getDataFromJson() {
        // Get basic data from the JSON database about the details of portfolio
        let currentPortfolio = document.getElementById('portfolio-selector').value;
        const resp = await this.PortfolioManager.getPortfolioData(currentPortfolio);
        var rows = Object.values(resp);
        console.log(rows);
        this.getDataFromAPI(rows);

        this.setState({
            shareNumber: rows.length
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