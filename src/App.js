import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import Reservations from './pages/Reservations';
import Reserve from './pages/Reserve';
import AddTrades from './pages/AddTrades';
import DeleteTrade from './pages/DeleteTrade';
import './App.css';
import TradesList from './components/trades/Trades-list';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Splash />} />
        <Route path="/delete" element={<DeleteTrade />} />
        <Route path="/add" element={<AddTrades />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
