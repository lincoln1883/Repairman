import React from 'react';
import './App.css';
import TradesList from './components/trades/Trades-list';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TradesList />
      </header>
    </div>
  );
}

export default App;
