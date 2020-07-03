import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ShareDisplay from './components/ShareDisplay';

class App extends Component {

  constructor() {
    // currentWindow == share || portfolio
    this.state = { currentWindow: "share" };
  }

  render() {
    return (
      <div className="App">
        {/* <Search /> */}

        if(this.state.currentWindow === "share"){
          <div className="share-view">
            <ShareDisplay />
          </div>
        } else{
          /* <div className="portfolio-view">
            <PortfolioDisplay />
          </div> */
        }

      </div>
    );
  }
}

export default App;

// `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${token}&interval=1min&apikey=BC34PVP226M1KDMR`

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact

// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact

