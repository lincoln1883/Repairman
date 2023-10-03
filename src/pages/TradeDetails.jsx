import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTradeDetails } from '../redux/reducers/tradeDetailsSlice';

const TradesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const trade = useSelector((state) => state.tradeDetails.trade);

  useEffect(() => {
    dispatch(fetchTradeDetails(id));
  }, [dispatch, id]);

  if (!trade) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <img
              src={trade.image}
              alt={trade.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold">{trade.name}</h2>
            <p className="text-gray-600 mt-2">
              Description:
              {trade.description}
            </p>
            <p className="text-gray-600 mt-2">
              Location:
              {trade.location}
            </p>
            <p className="text-gray-600 mt-2">
              Price:$
              {trade.price}
            </p>
            <p className="text-gray-600 mt-2">
              Duration:
              {trade.duration}
            </p>
            <p className="text-gray-600 mt-2">
              Type:
              {trade.trade_type}
            </p>
            <div className="mt-4 text-gray-600">
              <p className="text-sm">
                Created At:
                {new Date(trade.created_at).toLocaleString()}
              </p>
              <p className="text-sm">
                Updated At:
                {new Date(trade.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesDetails;
