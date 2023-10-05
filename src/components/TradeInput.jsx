import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTrades } from '../redux/reducers/tradesSlice';
import { getUserRole, getUserId } from '../utils/userStorage';

const TradeInput = () => {
  const dispatch = useDispatch();
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

    if (
      !tradeData.name
      || !tradeData.description
      || !tradeData.image
      || !tradeData.location
      || !tradeData.price
      || !tradeData.duration
      || !tradeData.trade_type
    ) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    console.log(tradeData);
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
        console.error('Submission failed:', error);
        setErrorMessage(error);
      });
  };

  return (
    <div className="text-center mt-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Add a New Trade</h2>
      <div className="bg-white bg-opacity-90 shadow-md p-4 rounded-md mx-auto max-w-md">
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <form onSubmit={handleNewTrade} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Trade Name"
            value={tradeData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
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
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={tradeData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={tradeData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
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
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={tradeData.duration}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
          />
          <input
            type="text"
            name="trade_type"
            placeholder="Trade Type"
            value={tradeData.trade_type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Trade
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeInput;
