import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReservation,
  resetCreated,
} from '../redux/reducers/resereveSlice'; // Correct the import path if needed
import { fetchTrades } from '../redux/reducers/tradesSlice'; // Correct the import path if needed

const ReserveForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trades = useSelector((state) => state.trades.trades);
  const created = useSelector((state) => state.reserve.isCreated);
  const [reservationData, setReservationData] = useState({
    trade_id: '',
    date: '',
    city: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (created) {
      dispatch(resetCreated());
      navigate('/trade/reservations');
    }
  }, [created, navigate, dispatch]);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation(reservationData))
      .unwrap()
      .then(() => {
        // Handle success here if needed
      })
      .catch((rejectedValueOrSerializedError) => {
        const errorMessage = rejectedValueOrSerializedError.message
          || 'Already reserved for this date';
        setErrorMessage(errorMessage);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReservationData({
      ...reservationData,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-600 via-indigo-400 to-blue-300"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col space-y-4 w-96">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Create Reservation
        </h1>

        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="trade_id" className="text-gray-600">
                Select a Trade:
                <select
                  name="trade_id"
                  id="trade_id"
                  value={reservationData.trade_id}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-indigo-200 focus:outline-none"
                >
                  <option value="">Select a Trade</option>
                  {trades.map((trade) => (
                    <option key={trade.id} value={trade.id}>
                      {trade.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex-1">
              <label htmlFor="city" className="text-gray-600">
                Select a City:
                <select
                  name="city"
                  id="city"
                  value={reservationData.city}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-indigo-200 focus:outline-none"
                >
                  <option value="">Select a City</option>
                  {trades.map((trade) => (
                    <option key={trade.id} value={trade.location}>
                      {trade.location}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="date" className="text-gray-600">
              Select a Date:
              <input
                type="date"
                name="date"
                id="date" // Add unique id
                value={reservationData.date}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-indigo-200 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md w-full transition-colors duration-300"
        >
          Create Reservation
        </button>
      </div>
    </form>
  );
};

export default ReserveForm;
