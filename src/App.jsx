import "./App.css";
import MainSection from "./components/MainSection";
import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
	// const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null); // tracking user id through props for all components

	return (
		<>
			<div id="app-container">
				<NavBar userId={userId} setUserId={setUserId} />
				<p>I am userId: {userId} from App</p>
				<MainSection userId={userId} setUserId={setUserId} />
			</div>
		</>
	);
}

export default App;
