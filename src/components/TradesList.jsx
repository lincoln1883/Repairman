import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrades } from '../redux/reducers/tradesSlice';

const TradesList = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);
  const error = useSelector((state) => state.trades.error);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4 text-red-600">
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="trades-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {trades.map((trade) => (
        <div
          key={trade.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg"
        >
          <img
            src={trade.image}
            alt={trade.name}
            className="w-full h-40 object-cover" // Adjust the height here (e.g., h-40) as needed
          />
          <h2 className="text-lg font-semibold mt-2">{trade.name}</h2>
          <p className="text-gray-700 text-sm">
            Location:
            {trade.location}
          </p>
          <p className="text-gray-700 text-sm">
            Price:$
            {trade.price}
          </p>
          <p className="text-gray-700 text-sm">
            Duration:
            {trade.duration}
          </p>
          <p className="text-gray-700 text-sm">
            Type:
            {trade.trade_type}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TradesList;
