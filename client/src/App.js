import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/HomePage.js'
import About from './pages/About.js'
import Contact from './pages/Contact_Us'
import Policy from './pages/Policy.js'
import PageNotFound from './pages/PageNotFound'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
