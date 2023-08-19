// this store combines the actions & reducers defined in the authSlice file and holds the application state.

import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./components/slices/authSlice";
import messageSliceReducer from "./components/slices/messageSlice";

const reducer = {
	auth: authSliceReducer,
	message: messageSliceReducer,
};

const store = configureStore({
	reducer: reducer,
	devTools: true,
});

export default store;
