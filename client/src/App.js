import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import './index.css';
import Home from './pages/Home.js';
import Income from './pages/Income.js';
import Summary from './pages/Summary.js';
import Expense from './pages/Expense.js';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';

function App() {
  const { user } = useAuthContext();
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <main
      className="App"
      onClick={(e) =>
        //make better -self note
        e.target.tagName !== 'NAV' && e.target.tagName !== 'SPAN'
          ? setShowNav(false)
          : ''
      }
    >
      <BrowserRouter>
        <Header toggleNav={toggleNav} />
        {showNav && <Navbar />}
        <div className="pages"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/income" element={user ? <Income /> : <Home />} />
          <Route path="/summary" element={user ? <Summary /> : <Home />} />
          <Route path="/expense" element={user ? <Expense /> : <Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
