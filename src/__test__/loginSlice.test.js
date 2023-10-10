import { configureStore } from '@reduxjs/toolkit';
import { login, loginReducer } from '../redux/reducers/auth/loginSlice';

jest.mock('axios');

const localStorageMock = {
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
};

global.localStorage = {
  ...localStorageMock,
  setItem: jest.fn(),
};

describe('loginSlice and loginUser async thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        login: loginReducer,
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
      userInfo: {},
      token: '',
    };

    const state = store.getState().login;
    expect(state).toEqual(initialState);
  });

  it('should update the login state with login action', () => {
    const mockUserData = {
      id: 1,
      name: 'testuser',
    };

    const action = login(mockUserData);
    const state = loginReducer(undefined, action);

    expect(state.status).toEqual('success');
    expect(state.error).toBeNull();
  });
});
