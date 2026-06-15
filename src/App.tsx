import './index.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import DashBoard from './pages/dashboard/Dashboard';
import { ProtectedRoute } from './routes/ProtectedRoutes';
import ScrollToTop from './components/common/ScrollToTop';

function App() {

 return (
 <>

<ScrollToTop/>
 <Routes>

 <Route 
 path="/" 
 element={<Home />} 
 />

 <Route 
 path="/register" 
 element={<Register />} 
 />

<Route 
 path="/login" 
 element={< Login />} 
 />
 <Route 
 path="/dashboard" 
 element={
 <ProtectedRoute>
<DashBoard />
 </ProtectedRoute>
 } 
 />
 </Routes>

 </>
 );
}

export default App;