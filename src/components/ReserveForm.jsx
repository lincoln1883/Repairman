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
        // Handle the error here and set the error message
        // console.error('Reservation error:', rejectedValueOrSerializedError);

        // Access the error message and set it
        const errorMessage = rejectedValueOrSerializedError.message || 'Already reserved for this date';
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="trade_id">
          Select a Trade:
          <select
            name="trade_id"
            id="trade_id"
            value={reservationData.trade_id}
            onChange={handleInputChange}
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

      <div>
        <label htmlFor="city">
          Select a City:
          <select
            name="city"
            id="city"
            value={reservationData.city}
            onChange={handleInputChange}
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

      <div>
        <input
          type="date"
          name="date"
          value={reservationData.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">Create Reservation</button>
      </div>
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
      )}
    </form>
  );
};

export default ReserveForm;
