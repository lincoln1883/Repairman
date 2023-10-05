import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation } from '../redux/reducers/reserevSlice';

const ReserveForm = () => {
  const [reservationData, setReservationData] = useState({
    trade_id: '',
    date: '',
    city: 'dhaka',
  });

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation(reservationData));
  };

  const createReservationStatus = useSelector(
    (state) => state.status,
  );

  if (createReservationStatus === 'pending') {
    return <div>Creating reservation...</div>;
  } if (createReservationStatus === 'fulfilled') {
    return <div>Reservation created successfully!</div>;
  } if (createReservationStatus === 'rejected') {
    return (
      <div>
        Error:
        {createReservationStatus.error.message}
      </div>
    );
  }

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
