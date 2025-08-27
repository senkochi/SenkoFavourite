import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import Characters from './pages/Characters';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Footer from './components/Footer/Footer';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import EmailVerification from './pages/EmailVerification';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import CharacterDisplay from './pages/CharacterDisplay';
import Blog from './pages/Blog';
import BlogCreate from './pages/BlogCreate';
import OAuth2Success from './pages/OAuth2Success';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './hook/scrollToTop';
import ForgotPassword from './pages/ForgotPassword';
import VnpayReturn from './pages/VnpayReturn';
import ImageGallery from './pages/ImageGallery';
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { useContext } from 'react';
import BlogDisplay from './pages/BlogDisplay';


const App = () => {

  const authState = useContext(AuthContext);

  return (
    <div>
        
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/characters' element={<CharacterDisplay />}></Route>
            <Route path='/characters/:character' element={<Characters />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/blog' element={<BlogDisplay />}></Route>
            <Route path='/blog/:slug' element={<Blog />}></Route>
            <Route path='/blog/create' element={<BlogCreate />}></Route>
            <Route path='/gallery' element={<Gallery />}></Route>
            <Route path='/products/:slug' element={<ProductDetails />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/verify-email' element={<EmailVerification />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/user/profile' element={<Profile />}></Route>
            <Route path="/oauth2/success" element={<OAuth2Success />} />
            <Route path='/admin/:tab' element={<Dashboard />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/vnpay-return' element={<VnpayReturn />}></Route>
            <Route path='/gallery/all' element={<ImageGallery />}></Route>
          </Routes>
          <Footer />
        
    </div>
  )
}

export default App