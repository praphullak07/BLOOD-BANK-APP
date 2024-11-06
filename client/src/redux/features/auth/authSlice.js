import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, userLogin, userRegister } from './authAction';


const token =localStorage.getItem('token') ? localStorage.getItem('token') : null
const initialState = {
    loading: false,
    user: null,
    token,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // login user
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null; 
        });
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token;
            state.error = null; // Reset error to null on successful login
        });
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload; // Set the error message on failed login
        });
    
        // register user
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null; // Clear any previous error on a new request
        });
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token;
            console.log("Registered User:", payload.user); // Confirm user details
        });
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            console.error("Registration Error:", payload); // Log payload for debugging
        });
    
        // current user
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null; 
        });
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user; // Set user data from payload
            state.error = null; // Reset error on successful fetch
        });
        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            console.error("Fetch Current User Error:", payload); // Log for debugging
        });
    }
    
});

export default authSlice;
