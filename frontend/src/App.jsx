import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import Characters from './pages/Characters';
import About from './pages/About';
import Donate from './pages/Donate';
import Footer from './components/Footer/Footer';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import EmailVerification from './pages/EmailVerification';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import CharacterDisplay from './pages/CharacterDisplay';
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useContext } from 'react';

const App = () => {

  const authState = useContext(AuthContext);

  return (
    <div>
        
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/characters' element={<CharacterDisplay />}></Route>
            <Route path='/characters/:character' element={<Characters />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/donate' element={<Donate />}></Route>
            <Route path='/products/:slug' element={<ProductDetails />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/verify-email' element={<EmailVerification />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/user/profile' element={<Profile />}></Route>
          </Routes>
          <Footer />
        
    </div>
  )
}

export default App