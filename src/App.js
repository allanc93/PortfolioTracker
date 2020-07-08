import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';

import ShareDisplay from './components/ShareDisplay';
import PortfolioDisplay from './components/PortfolioDisplay';
import Button from './components/Button';

class App extends Component {

<<<<<<< HEAD
    constructor() {
        // currentWindow == shares || portfolio
        super();
        this.state = { currentWindow: "portfolio" };

        this.switchWindow = this.switchWindow.bind(this);
    }

    render() {
        let windowType = this.state.currentWindow === "shares";
        return (
            // There is definitely a better way to do this!!
            <div className="App">
                <div className="btn-group-toggle">
                <Button value={'shares'} buttonText="Shares" handleClick={this.switchWindow}/>
                <Button value={'portfolio'} buttonText="My Portfolio" handleClick={this.switchWindow}/>
                </div>
                {windowType ? <ShareDisplay /> : <PortfolioDisplay />}
            </div>
        );
    }

    switchWindow(e){
        this.setState({
            currentWindow : e.target.value
        });
    }
=======
  constructor() {
    // currentWindow == shares || portfolio
    super();
    this.state = { currentWindow: "portfolio" };

    this.switchWindow = this.switchWindow.bind(this);
  }

  render() {
    let windowType = this.state.currentWindow === "shares";
    return (
      // There is definitely a better way to do this!!
      <div className="App">
        <div className="btn-group btn-group-toggle my-4">
          <Button value={'shares'} buttonText="Shares" handleClick={this.switchWindow} />
          <Button value={'portfolio'} buttonText="My Portfolio" handleClick={this.switchWindow} />
        </div>
        {windowType ? <ShareDisplay /> : <PortfolioDisplay />}
      </div>
    );
  }

  switchWindow(e) {
    this.setState({
      currentWindow: e.target.value
    });
  }
>>>>>>> 17b25be301f5958ea926e1e09d7c5f7da281526b

}

export default App;

// `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${token}&interval=1min&apikey=BC34PVP226M1KDMR`

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact

// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact