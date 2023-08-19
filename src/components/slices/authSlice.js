// This component makes async HTTP requests that trigger one or more dispatches for the actions

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";

import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

// Use the thunks from Redux Toolkit to handle action types and dispatch the correct action based on the promise

export const register = createAsyncThunk(
	"auth/register",
	async ({ username, password }, thunkAPI) => {
		try {
			const response = await authService.register(username, password);
			thunkAPI.dispatch(setMessage(response.data.message));
			console.log("response.data from register thunk: ", response.data);
			return response.data;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async ({ username, password }, thunkAPI) => {
		try {
			const data = await authService.login(username, password);
			return { user: data };
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

export const logout = createAsyncThunk("auth/logout", async () => {
	await authService.logout();
});

const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		[register.fulfilled]: (state) => {
			state.isLoggedIn = false;
		},
		[register.rejected]: (state) => {
			state.isLoggedIn = false;
		},
		[login.fulfilled]: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
		},
		[login.rejected]: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		[logout.fulfilled]: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

const { reducer } = authSlice;
export default reducer;
