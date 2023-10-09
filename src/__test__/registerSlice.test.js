import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { registerUser, register, registerReducer } from '../redux/reducers/auth/registerSlice';

jest.mock('axios');

describe('registerSlice and registerUser async thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        register: registerReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    const initialState = {
      status: 'idle',
      userToken: '',
      error: null,
    };

    const state = store.getState().register;
    expect(state).toEqual(initialState);
  });

  it('should handle registration failure', async () => {
    const userData = {
      name: 'testuser',
      email: 'test@email.com',
      password: 'password',
    };

    const mockErrorResponse = {
      response: {
        data: {
          message: 'Registration failed',
        },
      },
    };

    axios.post.mockRejectedValue(mockErrorResponse);

    await store.dispatch(registerUser(userData));
    const state = store.getState().register;

    expect(state.status).toEqual('failed');
    expect(state.error).toEqual(mockErrorResponse.response.data);
    expect(state.userToken).toEqual('');
  });

  it('should update the register state with register action', () => {
    const mockUserData = {
      name: 'testuser',
      email: 'test@email.com',
    };

    const action = register(mockUserData);
    const state = registerReducer(undefined, action);

    expect(state.status).toEqual('success');
    expect(state.error).toBeNull();
    expect(state.userToken).toEqual('');
  });
});
