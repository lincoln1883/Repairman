// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import { MemoryRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk'; // Import redux-thunk
// import TradesDetails from '../components/DetailsTrades';

// const mockStore = configureStore([thunk]); // Use redux-thunk middleware

// describe('TradesDetails', () => {
//   let store;
//   const tradeData = {
//     id: 1,
//     name: 'Trade Name',
//     description: 'Trade Description',
//     location: 'Trade Location',
//     price: 100,
//     duration: '1 hour',
//     trade_type: 'Type of Trade',
//     image: 'image-url',
//   };

//   beforeEach(() => {
//     store = mockStore({
//       tradeDetails: {
//         trade: tradeData,
//       },
//     });
//   });

//   it('renders trade details when trade data is available', async () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/trade/1']}>
//           <Routes>
//             <Route path="/trade/:id" element={<TradesDetails />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>,
//     );

//     // Wait for the component to fetch trade details and render
//     await waitFor(() => screen.getByText('Trade Name'));

//     // Assertions for trade details
//     expect(screen.getByText('Trade Name')).toBeInTheDocument();
//     expect(screen.getByText('Trade Description')).toBeInTheDocument();
//     expect(screen.getByText('Trade Location')).toBeInTheDocument();
//     expect(screen.getByText(/\$100\b/)).toBeInTheDocument(); // Update to '$100.0'
//     expect(screen.getByText('1 hour hours')).toBeInTheDocument();
//     expect(screen.getByText('Type of Trade')).toBeInTheDocument();
//     expect(screen.getByText('Click to Reserve')).toBeInTheDocument();
//   });

// //   it('displays loading message when trade data is not available', async () => {
// //     store = mockStore({
// //       tradeDetails: {
// //         trade: null,
// //       },
// //     });

// //     render(
// //       <Provider store={store}>
// //         <MemoryRouter initialEntries={['/trade/1']}>
// //           <Routes>
// //             <Route path="/trade/:id" element={<TradesDetails />} />
// //           </Routes>
// //         </MemoryRouter>
// //       </Provider>,
// //     );

// //     // Wait for the loading message to appear
// //     await waitFor(() => screen.getByText('Loading...'));

// //     // Assertions for loading message
// //     expect(screen.getByText('Loading...')).toBeInTheDocument();
// //   });
// });
