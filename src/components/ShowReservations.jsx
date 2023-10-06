import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations } from '../redux/reducers/rservationSlice';

const ShowReservation = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Reservations</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reservations ? (
          reservations.map((reservation) => (
            <li key={reservation.id} className="bg-white shadow-md rounded-lg p-4">
              <p className="text-lg font-semibold">
                Reservation Date:
                {' '}
                {reservation.date}
              </p>
              <p className="text-base mt-2">
                Trade Name:
                {' '}
                {reservation.trade.name}
              </p>
              <img
                src={reservation.trade.image}
                alt={reservation.trade.name}
                className="mt-2 h-32 object-cover w-full"
              />
            </li>
          ))
        ) : (
          <p className="text-gray-500">Loading reservations...</p>
        )}
      </ul>
    </div>
  );
};

export default ShowReservation;
