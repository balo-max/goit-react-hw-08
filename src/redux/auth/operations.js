import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const registrationUser = createAsyncThunk(
    'auth/registrationUser', async (credentials, thunkAPI) => {
        try {
            const response = await axios.post('/users/signup', credentials);
            setAuthHeader(response.data.token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);


export const loginUser = createAsyncThunk(
    'auth/loginUser', async (credentials, thunkAPI) => {
        try {
            const response = await axios.post('/users/login', credentials);
            setAuthHeader(response.data.token);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser', async (_, thunkAPI) => {
        try {
            await axios.post('/users/logout');
            setAuthHeader('');
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refreshUser', async (_, thunkAPI) => {
        try {
            const reduxState = thunkAPI.getState();
            setAuthHeader(reduxState.auth.token);
            const response = await axios.get('/users/current');
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    },
    {
        condition: (_, thunkAPI) => {
            const reduxState = thunkAPI.getState();
            return reduxState.auth.token !== null;
        }
    }
);