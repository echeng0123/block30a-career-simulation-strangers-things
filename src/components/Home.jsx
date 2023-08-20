// import SignUpForm from "./SignUpForm";
import NewPostForm from "./NewPostForm";

export default function Home() {
	// function CallBack(token) {
	// 	return (
	// 		<div>
	// 			<p>token from sign up form: {token}</p>
	// 		</div>
	// 	);
	// }

	return (
		<div>
			<h1>parent to child</h1>
			<br />
			{/* <SignUpForm handleCallback={CallBack} /> */}
			{/* <SignUpForm token={token} setToken={setToken} /> */}
			<NewPostForm />
		</div>
	);
}
