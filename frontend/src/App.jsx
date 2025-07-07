import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import BecomeVendor from './pages/BecomeVendor';
import VendorDashboard from './pages/VendorDashboard';
import AddProduct from './pages/AddProduct';
import VendorProductList from './pages/VendorProductList';
import Store from './pages/Store';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/vendor/register' element={<BecomeVendor />} />
        <Route path='/vendor/dashboard' element={<VendorDashboard />} />
        <Route path='/vendor/add-product' element={<AddProduct />} />
        <Route path='/vendor/products' element={<VendorProductList />}/>
        <Route path='/store' element={<Store />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-orders' element={<MyOrders />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
