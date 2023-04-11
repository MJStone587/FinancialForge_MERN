import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <main
      className="App"
      onClick={(e) =>
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
          <Route path="/income" element={<Income />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
