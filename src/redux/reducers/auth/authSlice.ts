import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  isAuthenticated: 'loading' | 'success';
  user: null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errorMessage: string | null;
}

const initialState: AuthState = {
  isAuthenticated: 'loading',
  user: null,
  token: null,
  status: 'idle',
  errorMessage: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log("userData to create", userData)
      const response = await axios.post('https://personal-balance-manager.onrender.com/api/register', userData);
      return response.data;
    } catch (errorMessage: any) {
      return rejectWithValue(errorMessage.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log("credentials ", credentials)
      const response = await axios.post('https://personal-balance-manager.onrender.com/api/login', credentials);
      return response.data;
    } catch (errorMessage: any) {
      return rejectWithValue(errorMessage.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.isAuthenticated = 'loading';
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload as string
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = 'success';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload as string;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;