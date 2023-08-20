import SignUpForm from "./SignUpForm";
// import NewPostForm from "./NewPostForm";

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
			<h1>homepage test</h1>
			<br />
			{/* <SignUpForm handleCallback={CallBack} /> */}
			<SignUpForm />
			{/* <NewPostForm /> */}
		</div>
	);
}
