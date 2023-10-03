import React, { useEffect } from 'react';
// import { deleteItem } from '../actions';
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
      <div className="trades-list grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full">
        <ul>
          {trades.map((trade) => (
            <li key={trade.id}>
              <div className="flex justify-between items-center text-lg font-semibold mt-2 bg-slate-100 rounded-lg shadow-md p-2 hover:shadow-lg m-2">
                {trade.name}
                <button
                  type="button"
                  className={`text-gray-700 text-sm rounded-lg shadow-md p-2 hover:shadow-lg
                    ${trade.removed ? 'bg-green-200' : 'bg-red-200'}`}
                  onClick={() => handleToggleRemoved(trade.id, trade.removed)}
                >
                  {trade.removed ? 'Restore' : 'Remove'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradeDelete;
