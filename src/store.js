// this store combines the actions & reducers defined in the authSlice file and holds the application state.

import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./components/slices/authSlice.js";
import messageSliceReducer from "./components/slices/messageSlice.js";

const reducer = {
	auth: authSliceReducer,
	message: messageSliceReducer,
};

const store = configureStore({
	reducer: reducer,
	devTools: true,
});

console.log("end of store reached");
console.log("reducer from store", reducer);

export default store;
