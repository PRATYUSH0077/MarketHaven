import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/HomePage.js'
import About from './pages/About.js'
import Contact from './pages/Contact_Us'
import Policy from './pages/Policy.js'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register';

// FOR NOTIFICATION
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/Admin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCateogary from './pages/Admin/CreateCateogary';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import UserProfile from './pages/user/UserProfile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';



function App() {
  return (
    <>
      <Routes>
        {/* BASIC ROUTES */}
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />


        {/* REGISTER,LOGIN AND PROTECTED ROUTES */}
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>

        {/* USER ROUTES */}
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />}></Route>
          <Route path='user/orders' element={<Orders />}></Route>
          <Route path='user/profile' element={<UserProfile />}></Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />}></Route>
          <Route path='admin/create-product' element={<CreateProduct />}></Route>
          <Route path='admin/update-product/:slug' element={<UpdateProduct />}></Route>
          <Route path='admin/products' element={<Products />}></Route>
          <Route path='admin/create-cateogary' element={<CreateCateogary />}></Route>
          <Route path='admin/user' element={<Users />}></Route>
        </Route>


        {/* ANY OTHER ROUTE */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
