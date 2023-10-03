import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTradeDetails } from '../redux/reducers/tradeDetailsSlice';

const TradesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const trade = useSelector((state) => state.tradeDetails.trade); // Use state.tradeDetails.trade

  useEffect(() => {
    // Dispatch an action to fetch trade details based on the ID
    dispatch(fetchTradeDetails(id));
  }, [dispatch, id]);

  // Check if trade is null or undefined before accessing its properties
  if (!trade) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <img
          src={trade.image}
          alt={trade.name}
          className="w-full h-40 object-cover"
        />
        <h2 className="text-xl font-semibold mt-2">{trade.name}</h2>
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
        <p className="text-gray-700 text-sm">
          Created At:
          {new Date(trade.created_at).toLocaleString()}
        </p>
        <p className="text-gray-700 text-sm">
          Updated At:
          {new Date(trade.updated_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TradesDetails;
