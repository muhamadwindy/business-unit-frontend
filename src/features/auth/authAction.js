import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINT from '../../globals/api-endpoint';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        API_ENDPOINT.AUTH_LOGIN,
        { username, password },
        config
      );

      if (data.status) {
        localStorage.setItem('userToken', data.message);
      }

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { username, firstname, lastname, email, password },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post(
        API_ENDPOINT.AUTH_REGISTER,
        {
          username,
          firstname,
          lastname,
          email,
          password,
        },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
