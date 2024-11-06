import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from 'react-toastify';

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                toast.success(data.message || "Login successful");
                window.location.replace('/');
                return { user: data.existingUser, token: data.token };
            }
            toast.error(data.message || "Invalid credentials, please try again.");
            return rejectWithValue(data.message);
        } catch (error) {
            const errorMessage = error.response?.data.message || "An error occurred during login.";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const userRegister = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/register', userData);
            if (data.success) {
                toast.success(data.message || "Registration successful");
                window.location.replace('/login');
                return { user: data.user, token: data.token };
            }
            toast.error(data.message || "User already exists.");
            return rejectWithValue(data.message);
        } catch (error) {
            const errorMessage = error.response?.data.message || "An error occurred during registration.";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    '/auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('/auth/current-user');
            return res?.data || rejectWithValue("No current user found.");
        } catch (error) {
            return rejectWithValue(error.response?.data.message || "An error occurred.");
        }
    }
);
