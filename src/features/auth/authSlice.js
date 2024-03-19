import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from './authAction';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  loginSuccess: false,
  loginLoading: false,
  loginErrorMessage: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken'); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => (
    builder.addCase(userLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    }),
    builder.addCase(userLogin.fulfilled, (state, payload) => {
      state.loginLoading = false;
      state.loginSuccess = payload.payload.status;
      state.userToken = payload.userToken;
    }),
    builder.addCase(userLogin.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload;
    }),
    // register user

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    }),
    builder.addCase(registerUser.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload;
    })
  ),
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
