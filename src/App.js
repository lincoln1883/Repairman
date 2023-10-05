import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import TradeDetails from './pages/TradeDetails';
import Reservations from './pages/Reservations';
import Reserve from './pages/Reserve';
import AddTrades from './pages/AddTrades';
import DeleteTrade from './pages/DeleteTrade';
import ListTrades from './pages/ListTrades';
import TradesList from './components/TradesList';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/NotFound';

function App() {
  const currentUser = localStorage.getItem('user');
  if (currentUser) {
    return (
      <Routes>
        <Route path="/trade" element={<Layout />}>
          <Route index element={<ListTrades />} />
          <Route path=":id" element={<TradeDetails />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="reserve" element={<Reserve />} />
          <Route path="add" element={<AddTrades />} />
          <Route path="delete" element={<DeleteTrade />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/trade" element={<Layout />}>
        <Route index element={<ListTrades />} />
        <Route path=":id" element={<TradeDetails />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="add" element={<AddTrades />} />
        <Route path="delete" element={<DeleteTrade />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Splash />} />
        <Route path="/trades" element={<TradesList />} />
        <Route path="/delete" element={<DeleteTrade />} />
        <Route path="/add" element={<AddTrades />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
