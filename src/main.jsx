import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react";
import userReducer from "./redux/authSlice.js";
import Home from "./components/Home.jsx";

const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				{/* <App /> */}
				<Home />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
