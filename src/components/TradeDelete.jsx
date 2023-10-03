import React, { useEffect } from 'react';
// import { deleteItem } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrades } from '../redux/reducers/tradesSlice';

const TradeDelete = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.users.role === 'admin');
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  if (!isAdmin) {
    return <div className="text-center mt-4">You must be an admin to see this page</div>;
  }

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const handleDelete = (tradeId) => {
    console.log(`Removing trade ${tradeId}`);
    // dispatch(deleteItem(tradeId));
  };

  return (
    <div>
      <h2>List of trades</h2>
      <ul>
        {trades.map((trade) => (
          <li key={trade.id}>
            {trade.name}
            {' '}
            <button type="button" onClick={() => handleDelete(trade.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeDelete;
