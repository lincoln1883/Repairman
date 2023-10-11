import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTradeDetails } from '../redux/reducers/tradeDetailsSlice';
import loadingImage from '../assets/images/loading.gif';

const TradesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const trade = useSelector((state) => state.tradeDetails.trade);

  useEffect(() => {
    dispatch(fetchTradeDetails(id));
  }, [dispatch, id]);

  if (!trade) {
    return (
      <div className="text-center mt-4">
        <img
          src={loadingImage} // Use the imported image here
          alt="Loading..."
        />
      </div>
    );
  }

  const backgroundStyle = {
    backgroundImage: `url(${trade.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={backgroundStyle}
    >
      <div className="bg-gray-100 rounded-lg shadow-md p-6 bg-opacity-80 backdrop-blur-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <img
              src={trade.image}
              alt={trade.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-1">
            <h2 className="text-4xl font-semibold text-indigo-600 mb-4">
              {trade.name}
            </h2>
            <p className="text-gray-900 mt-2 text-lg">
              <strong>Description:</strong>
              {' '}
              {trade.description}
            </p>
            <p className="text-gray-900 mt-2 text-lg">
              <strong>Location:</strong>
              {' '}
              {trade.location}
            </p>
            <p className="text-gray-900 mt-2 text-lg">
              <strong>Price:</strong>
              {' '}
              $
              {trade.price}
            </p>
            <p className="text-gray-900 mt-2 text-lg">
              <strong>Duration:</strong>
              {' '}
              {trade.duration}
              {' '}
              hours
            </p>
            <p className="text-gray-900 mt-2 text-lg">
              <strong>Type:</strong>
              {' '}
              {trade.trade_type}
            </p>
            <div className="mt-6">
              <Link
                to={`/trade/reserve/${trade.id}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-colors duration-300 text-lg font-semibold"
              >
                Click to Reserve
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesDetails;
