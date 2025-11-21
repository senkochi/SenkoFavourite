import React from "react";
import IonIcon from '@reacticons/ionicons';
import Logo from '../../assets/logo.jpg';

const Footer = () => {
  return (
    <div className=" w-full bg-gray-700 ">
      <div className="footer flex md:flex-row flex-col justify-between gap-10 pt-[5%] pb-[10%] mx-5">
        <div>
          <a className="flex items-center" href="/">
            <img className="w-16 rounded-full mx-2" src={Logo} alt="Logo" />
            <h1 className="text-orange-400 font-bold">Senko</h1>
          </a>
          <p>
            It's Sunday. There's no need to wake up or do work!
          </p>
        </div>
        <div>
          <ul className="text-[var(--dark-gray)] font-[var(--content-font)]">
            <h1>Senko</h1>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/product">Products</a>
            </li>
            <li>
              <a href="/characters">Characters</a>
            </li>
            <li>
              <a href="/blog">Blogs</a>
            </li>
            <li>  
              <a href="/gallery">Gallery</a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-[var(--dark-gray)] font-[var(--content-font)]">
            <h1>Resources</h1>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Documentations</a>
            </li>
            <li>
              <a href="#">Source</a>
            </li>
          </ul>
        </div>
        <div>
          <h1>A masterpiece made by Minh Dat</h1>
          <h2 className="text-white mb-3">Contact me:</h2>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/" target="blank">
              <IonIcon name="logo-facebook" className="text-white text-3xl"></IonIcon>
            </a>
            <a href="https://github.com/" target="blank">
              <IonIcon name="logo-github" className="text-white text-3xl"></IonIcon>
            </a>
            <a href="https://www.linkedin.com/" target="blank">
              <IonIcon name="logo-linkedin" className="text-white text-3xl"></IonIcon>
            </a>
          </div>
          
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
