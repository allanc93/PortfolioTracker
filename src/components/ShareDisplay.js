import React from 'react';
// import axios from 'axios';

import Input from './Input';
import TableComponent from './TableComponent';
import APICall from './APICall';
import Button from './Button';
import Modal from './Modal';
//import '../modalJQ';

class ShareDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchData = this.handleSearchData.bind(this);
        this.createModal = this.updateModal.bind(this);
        // Declare ShareDisplay component states
        this.state = {
            sharesData: [],
            shareNumber: 0,
            searchData: '',
            modalTitle: '',
            modalToken: ''

        };
    }

    handleSearchData(data) {
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

    updateModal(title, token) {
        console.log('updating modal to ' + title + ', ' + token);
        this.setState({
            modalTitle: title,
            modalToken: token
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
                    buy: <Button handleClick={() => { this.updateModal(result['2. name'], result['1. symbol']) }} buttonText='Buy' modal="true" token={`#${result['1. symbol']}`} />,
                }),
                // Add 1 to shareNumber state
                // shareNumber: this.state.shareNumber + 1
            });
            // Call checkShareNumber, to check if loading icon should still be displayed
            // this.checkShareNumber();
        })
    }

    // Check the value of the shareNumber state to determine if all results have been returned
    // checkShareNumber() {
    //     if (this.state.shareNumber === 7) {
    //         // Included setInterval to ensure icon is displayed for 3s after loading is complete
    //         setInterval(() => {
    //             if (document.getElementById('loading')) {
    //                 document.getElementById('loading').style.display = 'none';
    //             }
    //         }, 3000);
    //     }
    // }

    render() {
        return (
            <div className="share-display">
                <h1 className="my-4" >Shares Available</h1>
                <Input inputData={this.handleSearchData} />
                <hr className="my-4" />



                {(this.state.searchData === '') || (this.state.sharesData.length === 0)
                    ? <p>Enter a company name (eg, Apple) or it's symbol (eg, AAPL) to find results...</p>
                    : <TableComponent tableData={this.state.sharesData} />}



                <Modal title={this.state.modalTitle} id={this.state.modalToken} />




                {/* {((this.state.searchData === '') && (this.state.sharesData.length === 0))
                    ? <p>Enter a company name (eg, Apple) or it's symbol (eg, AAPL) to find results...</p>
                    : (this.state.sharesData.length > 0)
                        ? <TableComponent tableData={this.state.sharesData} />
                        : <p>No results were found, please try again.</p>} */}



                {/* <TableComponent tableData={this.state.sharesData} /> */}
                {/* <div id="loading" className="text-center">
                    <div className="spinner-border text-secondary " role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default ShareDisplay;