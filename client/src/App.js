import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';
import Income from './pages/Income.js';
import Summary from './pages/Summary.js';
import IncomeForm from './pages/IncomeForm.js';
import IncomeDetails from './components/IncomeDetails.js';
import Receipt from './pages/Expense.js';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/income/create" element={<IncomeForm />} />
          <Route path="/catalog/income/:id" element={<IncomeDetails />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
