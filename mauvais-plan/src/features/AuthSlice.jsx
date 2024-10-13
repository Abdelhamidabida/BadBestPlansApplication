import React from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { signup, signin } from "../components/services/AuthService";
import Swal from 'sweetalert2';
import WithReactContent from "sweetalert2-react-content";
const MySwal = WithReactContent(Swal);

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            // const {formData} = user
            // console.log(formData)
            const res = await signup(user);
            console.log(res.data)
            return res.data
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        try {
            const res = await signin(user);
            return res.data;
        } catch (error) {
            console.log(error);
            // Check if the error response status is 404 (Not Found)
            if (error.response && error.response.status === 404) {
                return thunkAPI.rejectWithValue("Email does not exist");
            }
            return thunkAPI.rejectWithValue();
        }
    }
);
export const logout = createAsyncThunk("auth/logout", () => {
    localStorage.removeItem("CC_Token");
    localStorage.removeItem("refresh_token");


});


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: "",
        isLoggedIn: false,
    },
    reducers: {
        // Reducer comes here
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.errorMessage = ""
            state.isLoggedIn = false
        }
    },
    extraReducers: (builder) => {
        //get articles
        builder
            //insertion user
            .addCase(register.pending, (state, action) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.status = null;
                state.isSuccess = true
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
                state.status = action.payload;
                state.user = null
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                localStorage.setItem("CC_Token", action.payload.token)
                //refreshToken
                localStorage.setItem('refresh_token', action.payload.refreshToken);
                MySwal.fire({
                    icon: 'success',

                })
                // localStorage.setItem("CC_User",action.payload.user)
                state.isSuccess = true;

            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    }
}
)




export const { reset } = authSlice.actions
export default authSlice.reducer;