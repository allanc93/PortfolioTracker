import React from 'react';

import SearchInput from './SearchInput';
import TableComponent from './TableComponent';
import APICall from './APICall';
import ButtonComponent from './ButtonComponent';
import ViewModal from './ViewModal';

class ShareDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchData = this.handleSearchData.bind(this);
        this.createModal = this.updateModal.bind(this);
        // Declare ShareDisplay component states
        this.state = {
            sharesData: [],
            resultData: [],
            searchData: '',
            modalTitle: '',
            modalToken: '',
            modalCurrency: '',
            modalShow: false
        };
    }

    handleSearchData = (data) => {
        this.setState({
            sharesData: [],
            searchData: data
        });
        if (data !== '' || data === null) {
            this.getDataFromAPI(data);
        }
    }

    componentDidMount() {
        if (this.state.searchData !== '') {
            this.getDataFromAPI();
        }
    }

    async updateModal(title, token, currency) {
        console.log(`Updating modal to ${title}/${token} (currency: ${currency}).`);
        this.setState({
            modalTitle: title,
            modalToken: token,
            modalCurrency: currency,
            modalShow: true
        });

        // Retrieve API data
        const resp = await APICall('GLOBAL_QUOTE', token);
        let responseData = Object.entries(resp.data);

        this.setState({
            // Define the name/value pairs to add to the responseData state
            resultData: ({
                symbol: responseData[0][1]['01. symbol'],
                open: Number(responseData[0][1]['02. open']).toFixed(2),
                high: Number(responseData[0][1]['03. high']).toFixed(2),
                low: Number(responseData[0][1]['04. low']).toFixed(2),
                price: Number(responseData[0][1]['05. price']).toFixed(2),
                volume: responseData[0][1]['06. volume'],
                latestTradingDay: responseData[0][1]['07. latest trading day'],
                previousClose: Number(responseData[0][1]['08. previous close']).toFixed(2),
                change: Number(responseData[0][1]['09. change']).toFixed(2),
                changePercent: responseData[0][1]['10. change percent']
            }),
        });
    }

    async getDataFromAPI(keyword) {
        // Retrieve API data
        const resp = await APICall('SYMBOL_SEARCH', keyword);
        let responseData = Object.entries(resp.data);

        // Loop through the data in the API response array
        responseData[0][1].forEach((result) => {
            this.setState({
                // Define the name/value pairs to add to the sharesData state
                sharesData: this.state.sharesData.concat({
                    name: result['2. name'],
                    symbol: result['1. symbol'],
                    type: result['3. type'],
                    region: result['4. region'],
                    currency: result['8. currency'],
                    timezone: result['7. timezone'],
                    open: result['5. marketOpen'],
                    close: result['6. marketClose'],
                    Details: <ButtonComponent handleClick={() => { this.updateModal(result['2. name'], result['1. symbol'], result['8. currency']) }} buttonText='View' btnType="modalOpen" token={`#${result['1. symbol']}`} />,
                }),
            });
        })
    }

    render() {
        return (
            <div className="share-display">
                <h1 className="my-4" >Shares Available</h1>
                <SearchInput inputData={this.handleSearchData} />
                <hr className="my-4" />

                {(this.state.searchData === '') || (this.state.sharesData.length === 0)
                    ? <p>Enter a company name (eg, Apple) or it's symbol (eg, AAPL) to find results...</p>
                    : <TableComponent tableData={this.state.sharesData} />}

                <ViewModal title={this.state.modalTitle} id={this.state.modalToken} currency={this.state.modalCurrency} show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} modalData={this.state.resultData} />
            </div>
        );
    }
}

export default ShareDisplay;