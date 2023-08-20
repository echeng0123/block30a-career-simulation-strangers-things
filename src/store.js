// This store keeps track of the application state

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/authSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

export default store;