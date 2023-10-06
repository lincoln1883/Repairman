/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation, fetchCitiesAndTrades } from '../redux/reducers/reserevSlice';

const ReserveForm = () => {
  const [reservationData, setReservationData] = useState({
    trade_id: '',
    date: '',
    city: 'dhaka',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCitiesAndTrades());
  }, [dispatch]);

  const cities = useSelector((state) => state.reserve.cities);
  const trades = useSelector((state) => state.reserve.trades);
  console.log('the cities are in from', cities);
  console.log('the trades are in from', trades);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation(reservationData));
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
        <input
          type="text"
          name="trade_id"
          value={reservationData.trade_id}
          onChange={handleInputChange}
        />
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
    </form>
  );
};

export default ReserveForm;
