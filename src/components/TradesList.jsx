import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import Lottie from 'lottie-react';
import { fetchTrades } from '../redux/reducers/tradesSlice';
import loadingImage from '../assets/images/loading.gif';

// import animationData from '../assets/images/loader-bals.json';

const TradesList = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);
  const error = useSelector((state) => state.trades.error);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <img
          src={loadingImage} // Use the imported image here
          alt="Loading..."
        />
      </div>
    );
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
    <div className="text-center mt-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {trades.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="bg-cyan-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
          >
            <div
              style={{
                backgroundImage: `url(${trade.image})`,
                filter: 'brightness(0.6)',
              }}
              className="bg-cover bg-center bg-no-repeat h-72"
            />
            <div className="p-6 bg-black bg-opacity-30 absolute inset-0 flex flex-col items-center justify-center text-white">
              <h5 className="text-2xl font-semibold">{trade.name}</h5>
              <p className="text-green-300 text-sm mt-2">{`$${trade.price}`}</p>
              <p className="text-blue-300 text-sm">{`${trade.location}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TradesList;
