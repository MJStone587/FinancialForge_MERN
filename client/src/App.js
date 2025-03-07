import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import { useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
//import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home.js";
import Income from "./pages/Income.js";
import Summary from "./pages/Summary.js";
import Expense from "./pages/Expense.js";
import Header from "./components/Header";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";

function App() {
	const { user } = useAuthContext();

	return (
		<main
			className='App'
			/*
			onClick={(e) =>
				//make better -self note
				e.target.tagName !== "NAV" && e.target.tagName !== "SPAN" ? setShowNav(false) : ""
			}*/
		>
			<BrowserRouter>
				<Header />
				{/*<Header toggleNav={toggleNav} />*/}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/income' element={user ? <Income /> : <Navigate to='/login' />} />
					<Route path='/summary' element={user ? <Summary /> : <Navigate to='/login' />} />
					<Route
						path='/expense'
						element={user ? <Expense /> : <Navigate to='/login' />} /*remove or add !user to user*/
					/>
					<Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
					<Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
