import { configureStore } from '@reduxjs/toolkit';
import { logoutReducer } from '../redux/reducers/auth/logoutSlice';

jest.mock('axios');

const localStorageMock = {
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
};

global.localStorage = {
  ...localStorageMock,
  getItem: jest.fn(),
};

describe('logoutSlice and logoutUser async thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        logout: logoutReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    const initialState = {
      status: 'idle',
      error: null,
    };

    const state = store.getState().logout;
    expect(state).toEqual(initialState);
  });
});
