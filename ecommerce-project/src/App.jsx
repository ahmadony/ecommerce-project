import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckOutPage';
import OrderPage from './pages/OrderPage';
import './App.css'

function App() {


  return (
    <>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='orders' element={<OrderPage />}/>
    </Routes>

    </>
  );
}

export default App
