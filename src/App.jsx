import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./Contexts/CityContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullpage from "./components/SpinnerFullpage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// OPTIMIZING BUNDLE SIZE WITH CODE SPLITTING
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<CitiesProvider>
				<AuthProvider>
					<BrowserRouter>
						<Suspense fallback={<SpinnerFullpage />}>
							<Routes>
								<Route path="/" element={<Homepage />} />
								<Route path="product" element={<Product />} />
								<Route path="pricing" element={<Pricing />} />
								<Route path="login" element={<Login />} />
								<Route path="sign-up" element={<SignUp />} />
								<Route
									path="app"
									element={
										<ProtectedRoute>
											<AppLayout />
										</ProtectedRoute>
									}
								>
									{/* index Route with declarative navigation with the react navigate hook*/}
									<Route index element={<Navigate replace to="cities" />} />
									{/* Nested route  */}
									<Route path="cities" element={<CityList />} />
									{/* Dynamic Route: for storing data into the URL */}
									<Route path="cities/:id" element={<City />} />
									<Route path="countries" element={<CountryList />} />
									<Route path="form" element={<Form />} />
								</Route>
								<Route path="*" element={<PageNotFound />} />
							</Routes>
						</Suspense>
					</BrowserRouter>
				</AuthProvider>
			</CitiesProvider>
			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{
					margin: "8px",
				}}
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 5000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "500px",
						padding: "16px 24px",
						backgroundColor: "#fff",
						color: "#374151",
					},
				}}
			/>
		</QueryClientProvider>
	);
}

export default App;
