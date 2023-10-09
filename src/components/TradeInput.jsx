import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTrades } from '../redux/reducers/tradesSlice';
import { getUserRole, getUserId } from '../utils/userStorage';
import '../styles/trade.css';

const TradeInput = () => {
  const dispatch = useDispatch();
  const tradeLoading = useSelector((state) => state.trades.loading);
  const tradeError = useSelector((state) => state.trades.error);
  const tradeSuccess = useSelector((state) => state.trades.status);
  const navigate = useNavigate();

  const currentUser = getUserId();
  const isAdmin = getUserRole() === 'admin';

  const [tradeData, setTradeData] = useState({
    name: '',
    description: '',
    image: '',
    location: '',
    price: '',
    duration: '',
    trade_type: '',
    user_id: currentUser,
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (tradeSuccess === 'success') {
      navigate('/trade');
    }
  }, [tradeSuccess, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTradeData({
      ...tradeData,
      [name]: value,
    });
  };

  if (!isAdmin) {
    return (
      <div className="text-center mt-4 font-semibold text-red-500 w-full">
        You must be an admin to see this page
      </div>
    );
  }

  const handleNewTrade = (e) => {
    e.preventDefault();

    dispatch(addTrades(tradeData))
      .then(() => {
        setTradeData({
          name: '',
          description: '',
          image: '',
          location: '',
          price: '',
          duration: '',
          trade_type: '',
          user_id: currentUser,
        });
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    <div className="text-center mt-40 w-full">
      <h2 className="text-xl font-semibold mb-4">Add a New Trade</h2>
      <div className="bg-white bg-opacity-90 shadow-md p-9 rounded-3xl mx-auto max-w-md tradeinput-container">
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <form onSubmit={handleNewTrade} className="space-y-4">
          {tradeError && <div className="text-red-500">{tradeError}</div>}
          <input
            type="text"
            name="name"
            placeholder="Trade Name"
            value={tradeData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />
          <input
            type="hidden"
            name="user_id"
            value={currentUser}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={tradeData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={tradeData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={tradeData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />
          <input
            type="number"
            step="any"
            name="price"
            placeholder="Price"
            value={tradeData.price}
            min={0}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={tradeData.duration}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />
          <input
            type="text"
            name="trade_type"
            placeholder="Trade Type"
            value={tradeData.trade_type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />
          <button
            type="submit"
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md ${
              tradeLoading ? 'cursor-not-allowed' : ''
            }tradeBtn`}
            disabled={tradeLoading}
          >
            {tradeLoading ? 'Adding Trade...' : 'Add Trade'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeInput;
