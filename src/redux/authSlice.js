import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// Initial token & user are both empty (not logged in)
	// token: null,
	username: "",
	password: "",
	users: [],
};

const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		register: (state, action) => {
			const { guestName, guestPassword } = action.payload;
			state.username = guestName;
			state.password = guestPassword;
			// state.token = userToken;
			state.users.push({
				action: "Register",
				// guestName,
				// guestPassword,
				username: state.username,
				password: state.password,
				// userToken,
				// token: state.token,
			});
		},
	},
	// extraReducers: {},
});

// Exporting actions from the authSlice
export const { register } = authSlice.actions;

// Export the reducer as the default export
export default authSlice.reducer;
