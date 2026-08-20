import './App.css';
import Inventory from './components/Inventory';
import AboutUs from './components/AboutUs';
import NavBar from './components/NavBar';
import Transactions from './components/transactions/Transactions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        {/* A navigation bar to navigate through the application */}
        <NavBar />
        <Routes>
          {/* Pages currently available */}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
