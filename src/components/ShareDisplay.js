import React from 'react';
import axios from 'axios';

import ShareInfo from './ShareInfo';

class ShareDisplay extends React.Component {
    // state = {
    //     sharesData: [],
    //     numOfResults: 0
    // }
    constructor() {
        super();
        this.state = {
            sharesData: [],
            shareNumber: 0
        };
    }

    componentDidMount() {
        // fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact')
        //     .then(response => response.json())
        //     .then((data) => {
        //         this.setState({ sharesData: data.bestMatches, numOfResults: data.bestMatches.length })
        //     })
        //     .catch(console.log)
        this.getDataFromAPI();
    }

    async getDataFromAPI() {
        const APIlink = `testSharesData.json`;
        // const APIlink = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact`;
        const resp = await axios.get(APIlink);
        let responseData = Object.entries(resp.data);
        console.log("BEFORE LOOP");
        console.log(responseData);
        responseData[0][1].forEach((result) => {
            this.setState({
                sharesData: this.state.sharesData.concat({
                    name: result['2. name'],
                    symbol: result['1. symbol'],
                    type: result['3. type'],
                    region: result['4. region'],
                    currency: result['8. currency'],
                    timezone: result['7. timezone'],
                    open: result['5. marketOpen'],
                    close: result['6. marketClose'],
                })
            });
            console.log("IN LOOP");
            console.log(result);
            console.log(this.state.sharesData);
        })
        console.log("AFTER LOOP");
        console.log(this.state.sharesData);
    }

    render() {
        return (
            <div className="share-display">
                <h1 className="my-4" >Shares Available</h1>
                <hr className="my-4" />
                <table className="table table-bordered table-hover mx-auto my-5">
                    <thead className="thead-dark">
                        <tr>
                            <th>Symbol</th>
                            <th>Company Name</th>
                            <th>Type</th>
                            <th>Region</th>
                            <th>Currency</th>
                            <th></th>
                        </tr>
                    </thead>
                    {/* Return share results */}
                    {/* <ShareInfo shares={this.state.sharesData} /> */}
                </table>
                {/* <div id="loading" className="text-center">
                    <div class="spinner-border text-secondary " role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default ShareDisplay;