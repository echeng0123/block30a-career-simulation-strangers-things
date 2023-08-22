import "./App.css";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";
import Header from "./components/Header";

function App() {
	return (
		<>
			<div id="app-container">
				<Header />
				<NavBar />
				<MainSection />
			</div>
		</>
	);
}

export default App;
