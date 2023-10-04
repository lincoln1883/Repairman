import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrades, updateRemoveTrade } from '../redux/reducers/tradesSlice';

const TradeDelete = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.users.role === 'admin');
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  if (!isAdmin) {
    return (
      <div className="text-center mt-4 font-semibold text-red-500 w-full">
        You must be an admin to see this page
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const handleToggleRemoved = (tradeId, isRemoved) => {
    const updatedTrade = {
      id: tradeId,
      removed: !isRemoved,
    };
    dispatch(updateRemoveTrade(updatedTrade));
  };

  return (
    <div className="text-center mt-4 w-full">
      <h2 className="text-2xl font-semibold mb-2">
        Trades administration
      </h2>
      <p className="text-sm text-gray-500">
        Click on a trade to remove or restore it
      </p>
      <div className="mt-4 flex flex-row flex-wrap justify-evenly gap-4">
        {trades.map((trade) => (
          <div key={trade.id} className="block h-40 w-80 min-w-0 relative rounded-lg bg-white p-6 shadow-lg border-solid border-2 border-slate-400">
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg ${trade.removed ? 'opacity-50 grayscale' : 'opacity-60'}`}
              style={{ backgroundImage: `url(${trade.image})` }}
            />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <h5 className="text-xl font-bold text-neutral-800 text-slate-800">
                {trade.name}
              </h5>
              <button
                type="button"
                className={`text-gray-700 font-medium text-sm rounded-sm shadow-sm shadow-slate-600 p-2 border-2 hover:shadow-lg hover:bg-gray-100 hover:shadow-slate-900
                  ${trade.removed ? 'border-green-500' : 'border-red-500'}`}
                onClick={() => handleToggleRemoved(trade.id, trade.removed)}
              >
                {trade.removed ? 'Restore' : 'Remove'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeDelete;
