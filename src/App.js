import React, { Component } from 'react';
import './App.css';

import ShareDisplay from './components/ShareDisplay';
import PortfolioDisplay from './components/PortfolioDisplay';
import Button from './components/Button';

class App extends Component {

  constructor() {
    // currentWindow == shares || portfolio
    super();
    this.state = {
      currentWindow: "shares"
    };
    this.switchWindow = this.switchWindow.bind(this);
  }

  render() {
    let windowType = this.state.currentWindow === "portfolio";
    return (
      // There is definitely a better way to do this!!
      <div className="App">
        <div className="btn-group btn-group-toggle my-4">
          <Button value={'shares'} buttonText="Shares" handleClick={this.switchWindow} />
          <Button value={'portfolio'} buttonText="My Portfolio" handleClick={this.switchWindow} />
        </div>
        {windowType ? <PortfolioDisplay /> : <ShareDisplay />}
      </div>
    );
  }

  switchWindow(e) {
    this.setState({
      currentWindow: e.target.value
    });
  }

}

export default App;

// `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${token}&interval=1min&apikey=BC34PVP226M1KDMR`

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact

// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact