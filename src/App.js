import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ShareDisplay from './components/ShareDisplay';
import PortfolioDisplay from './components/PortfolioDisplay';

class App extends Component {

  constructor() {
    // currentWindow == share || portfolio
    super();
    this.state = { currentWindow: "share" };
  }

  render() {
    const windowType = this.state.currentWindow === "share";
    return (
      // There is definitely a better way to do this!!
      <div className="App">
        {windowType ? this.shareDisplay() : this.portfolioDisplay()}
      </div>
    );
  }

  shareDisplay() {
    return (
      <ShareDisplay />
    );
  }

  portfolioDisplay() {
    return (
      <PortfolioDisplay />
    );
  }

}

export default App;

// `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${token}&interval=1min&apikey=BC34PVP226M1KDMR`

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact

// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact
