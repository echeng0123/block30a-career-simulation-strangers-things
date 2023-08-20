import "./App.css";
import MainSection from "./components/MainSection";
import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
	const [token, setToken] = useState(null);

	return (
		<>
			<div id="app-container">
				<NavBar token={token} setToken={setToken} />
				<MainSection token={token} setToken={setToken} />
			</div>
		</>
	);
}

export default App;
