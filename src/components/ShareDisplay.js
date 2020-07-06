import React from 'react';
import ShareInfo from './ShareInfo';

class ShareDisplay extends React.Component {
    render() {
        return (
            <div className="share-table">
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Company Name</th>
                            <th>Type</th>
                            <th>Region</th>
                            <th>Currency</th>
                        </tr>
                    </thead>
                    {/* Loop through share results */}
                    <ShareInfo shares={this.state.shares} />
                </table>
            </div>
        );
    }

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
}

export default ShareDisplay;