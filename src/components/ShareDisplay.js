import React from 'react';
import axios from 'axios';

import ShareInfo from './ShareInfo';

class ShareDisplay extends React.Component {
    state = {
        shares: []
    }

    componentDidMount() {
        fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact')
            .then(response => response.json())
            .then((data) => {
                this.setState({ shares: data.bestMatches })
            })
            .catch(console.log)
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
                    {/* Loop through share results */}
                    <ShareInfo shares={this.state.shares} />
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