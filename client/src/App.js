import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages"></div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
