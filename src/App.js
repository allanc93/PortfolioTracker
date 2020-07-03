import React from 'react';
import logo from './logo.svg';
import './App.css';

import ShareDisplay from './components/ShareDisplay';

function App() {
  return (
    <div className="App">
      {/* IF Shares view/screen is selected, display this */}
      <div className="share-view">
        {/* <ShareSearch /> */}
        <ShareDisplay />
      </div>

      {/* IF Portfolio view/screen is selected, display this */}
      {/* <div className="portfolio-view">
        <PortfolioSearch />
        <PortfolioDisplay />
      </div> */}
    </div>
  );
}

export default App;

// `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${token}&interval=1min&apikey=BC34PVP226M1KDMR`

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact

// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AAPL&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact

