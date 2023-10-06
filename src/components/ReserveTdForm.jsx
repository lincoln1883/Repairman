import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReservation, resetCreated } from '../redux/reducers/resereveSlice';
import { fetchTrades } from '../redux/reducers/tradesSlice';

const ReserveTdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trades = useSelector((state) => state.trades.trades);
  const created = useSelector((state) => state.reserve.isCreated);
  console.log('the status is', created);
  const { tradeId } = useParams();
  console.log('the trade  id is', tradeId);
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
    </form>
  );
};

export default ReserveTdForm;
