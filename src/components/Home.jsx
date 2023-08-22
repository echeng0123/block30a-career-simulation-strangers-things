import SignUpForm from "./SignUpForm";
import Login from "./Login";
import { useSelector } from "react-redux";
import { currentToken } from "../redux/authSlice";

export default function Home() {
	// get current state
	const tokenHomeNow = useSelector(currentToken);
	console.log("tokenHomeNow", tokenHomeNow);

	// setTokenHome(tokenHomeNow);
	return (
		<div>
			{tokenHomeNow ? (
				<div>
					<div>
						<h1 id="home-header">Welcome!</h1>
						<br />
					</div>
				</div>
			) : (
				<div>
					<div>
						<h1 id="home-header">Welcome</h1>
						<br />
						<div>
							<SignUpForm />
						</div>
						<br />
						<div>
							<Login />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
