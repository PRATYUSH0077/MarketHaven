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
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='' element={<Dashboard />}></Route>
        </Route>


        {/* ANY OTHER ROUTE */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
