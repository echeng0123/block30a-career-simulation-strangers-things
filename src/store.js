// This store keeps track of the application state

import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./redux/authSlice";

const store = configureStore({
	reducer: {
		account: accountReducer,
	},
});

export default store;
