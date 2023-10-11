import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReservation,
  resetCreated,
} from '../redux/reducers/resereveSlice';
import { fetchTrades } from '../redux/reducers/tradesSlice';

const ReserveTdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trades = useSelector((state) => state.trades.trades);
  const created = useSelector((state) => state.reserve.isCreated);
  const [errorMessage, setErrorMessage] = useState('');
  const { tradeId } = useParams();

  const [reservationData, setReservationData] = useState({
    trade_id: tradeId,
    date: '',
    city: '',
  });

  useEffect(() => {
    if (created) {
      dispatch(resetCreated());
      navigate('/trade/reservations');
    }
  }, [created, navigate, dispatch]);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  if (trades === null) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation(reservationData))
      .unwrap()
      .then(() => {})
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
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <h3 className="text-2xl pb-6 font-semibold text-center text-gray-600">
        Create a Reservation
      </h3>
      <div className="bg-gray-100 bg-opacity-80 p-6 rounded-3xl shadow-lg w-128 space-y-4">
        <div className="flex flex-col ">
          <div className="flex-1 pb-4">
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
          <div className="flex-1">
            <label htmlFor="date" className="text-gray-600">
              Select a Date:
              <input
                id="date"
                type="date"
                name="date"
                value={reservationData.date}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-indigo-200 focus:outline-none"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4 w-60">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg w-full transition-colors duration-300 shadow-md reserveBtn"
        >
          Create Reservation
        </button>
        {errorMessage && (
          <p className="text-red-600 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </form>
  );
};

export default ReserveTdForm;
