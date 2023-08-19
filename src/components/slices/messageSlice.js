// This updates the message state when the application dispatches a message

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		setMessage: (state, action) => {
			return { message: action.payload };
		},
		clearMessage: () => {
			return { message: "" };
		},
	},
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
