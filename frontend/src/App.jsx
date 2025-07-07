import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import BecomeVendor from './pages/BecomeVendor';
import VendorDashboard from './pages/VendorDashboard';

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
      </Routes>
    </Router>
      
    </>
  )
}

export default App
