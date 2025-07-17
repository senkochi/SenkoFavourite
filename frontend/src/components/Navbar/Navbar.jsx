import React, { useState } from "react";
import Logo from "../../assets/logo.jpg";
import IonIcon from "@reacticons/ionicons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-amber-200 fixed top-0 left-0 w-full z-50 shadow-lg font-heading">
      <div className="flex-shrink-0">
        <a className="flex items-center" href="/">
          <img className="w-16 rounded-full mx-2" src={Logo} alt="Logo" />
          <h1 className="text-orange-400 font-bold">Senko</h1>
        </a>
      </div>
      <div
        className={`
                    md:static fixed top-0 left-0
                    md:min-h-fit min-h-screen
                    md:w-auto w-0 overflow-hidden transition-all duration-300
                    bg-amber-200 z-40
                    ${menuOpen ? "w-[60%] p-4 flex" : "w-0 p-0 hidden"} 
                    md:flex md:p-0 md:w-auto
                    `}
      >
        <div className="flex flex-col mx-3 w-full">
          <h2 className="text-xl font-bold py-8 md:hidden">Menu</h2>
          <div className="flex-1 flex justify-end overflow-hidden">
            <ul
              className="flex md:flex-row flex-col
  md:items-center
  lg:gap-[4vw] md:gap-[3vw] gap-4
  px-3 w-full   
  md:max-w-[55vw] md:overflow-hidden md:truncate"
            >
              <li className="md:w-auto w-full">
                <a href="/" className="w-full">
                  <div className="menu-item">
                    <p className="lg:text-base md:text-sm">Home</p>
                    <div className="md:hidden">
                      <IonIcon name="chevron-forward-outline"></IonIcon>
                    </div>
                  </div>
                </a>
              </li>
              <li className="md:w-auto w-full">
                <a href="/products" className="w-full">
                  <div className="menu-item">
                    <p className="lg:text-base md:text-sm">Products</p>
                    <div className="md:hidden">
                      <IonIcon name="chevron-forward-outline"></IonIcon>
                    </div>
                  </div>
                </a>
              </li>
              <li className="md:w-auto w-full">
                <a href="/characters" className="w-full">
                  <div className="menu-item">
                    <p className="lg:text-base md:text-sm">Characters</p>
                    <div className="md:hidden">
                      <IonIcon name="chevron-forward-outline"></IonIcon>
                    </div>
                  </div>
                </a>
              </li>
              <li className="md:w-auto w-full">
                <a href="/about" className="w-full">
                  <div className="menu-item">
                    <p className="lg:text-base md:text-sm">About</p>
                    <div className="md:hidden">
                      <IonIcon name="chevron-forward-outline"></IonIcon>
                    </div>
                  </div>
                </a>
              </li>
              <li className="md:w-auto w-full">
                <a href="/donate" className="w-full">
                  <div className="menu-item">
                    <p className="lg:text-base md:text-sm">Donate</p>
                    <div className="md:hidden">
                      <IonIcon name="chevron-forward-outline"></IonIcon>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 mx-6">
        <nav>
          {authState.isAuthenticated ? (
            <>
              <span onClick={() => navigate("/user/profile")}>Xin chào, {authState.user}</span>
              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary bg-orange-400 px-4 py-2 rounded-full hover:bg-orange-300 flex-shrink-0"
            >
              Sign in
            </Link>
          )}
        </nav>
        <div className="md:hidden">
          <IonIcon
            name={menuOpen === false ? "menu" : "close"}
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          ></IonIcon>
        </div>
        <div>
          {authState.isAuthenticated ? (
            <Link to={"/cart"}>
              <IonIcon name="cart-outline" className="text-2xl"></IonIcon>
            </Link>
          ) : (
            <Link to={"/login"}>
              <IonIcon name="cart-outline" className="text-2xl"></IonIcon>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
