import { RouterProvider, createBrowserRouter } from "react-router";
import { Route, createRoutesFromElements } from "react-router";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/register" element={<Register />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
			</>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer theme="dark" />
		</>
	);
};

export default App;
