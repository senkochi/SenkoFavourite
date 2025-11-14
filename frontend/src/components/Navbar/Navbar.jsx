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
    <div
      className="flex justify-between items-center bg-yellow-200 fixed top-0 left-0 w-full z-50 shadow-xl border-b-4 border-yellow-300"
      style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}
    >
      <div className="flex-shrink-0 flex items-center gap-2 pl-4 py-2">
        <a className="flex items-center" href="/">
          <img
            className="w-16 h-16 rounded-full border-4 border-yellow-300 shadow-lg mx-2"
            src={Logo}
            alt="Logo"
          />
          <h1 className="text-orange-500 font-bold text-2xl drop-shadow-lg tracking-wide" style={{ fontFamily: "'Montserrat', 'Poppins', Arial, sans-serif" }}>
            Senko
          </h1>
        </a>
      </div>
      <div
        className={`
          md:static fixed top-0 left-0
          md:min-h-fit min-h-screen
          md:w-auto w-0 overflow-hidden transition-all duration-300
          bg-yellow-200 z-40
          ${menuOpen ? "w-[60%] p-4 flex" : "w-0 p-0 hidden"} 
          md:flex md:p-0 md:w-auto
        `}
      >
        <div className="flex flex-col mx-3 w-full">
          <h2 className="text-2xl font-bold py-8 md:hidden text-orange-500" style={{ fontFamily: "'Montserrat', 'Poppins', Arial, sans-serif" }}>
            Menu
          </h2>
          <div className="flex-1 flex justify-end overflow-hidden">
            <ul
              className="flex md:flex-row flex-col
                md:items-center
                lg:gap-[4vw] md:gap-[3vw] gap-4
                px-3 w-full   
                md:max-w-[55vw] md:overflow-hidden md:truncate"
            >
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/characters", label: "Characters" },
                { to: "/blogs", label: "Blogs" },
                { to: "/gallery", label: "Gallery" },
              ].map((item) => (
                <li key={item.to} className="md:w-auto w-full">
                  <a href={item.to} className="w-full">
                    <div className="menu-item flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-yellow-300 transition" style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}>
                      <p className="lg:text-base md:text-sm text-orange-500  tracking-wide">
                        {item.label}
                      </p>
                      <div className="md:hidden">
                        <IonIcon name="chevron-forward-outline"></IonIcon>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 mx-6">
        <nav>
          {authState.isAuthenticated ? (
            <>
              {console.log(authState)}
              {console.log("ffefef " + authState.role)}
              {authState.role && authState.role.includes("ROLE_ADMIN") ? (
                <span
                  className="cursor-pointer text-orange-500 font-bold hover:underline"
                  style={{ fontFamily: "'Montserrat', 'Poppins', Arial, sans-serif" }}
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Admin Panel
                </span>
              ) : (
                <span
                  className="cursor-pointer text-orange-500 hover:underline"
                  style={{ fontFamily: "'Montserrat', 'Poppins', Arial, sans-serif" }}
                  onClick={() => navigate("/user/profile")}
                >
                  Welcome, {authState.user}
                </span>
              )}
              <button
                className="ml-4 bg-pink-200 text-orange-700 px-4 py-2 rounded-full hover:bg-yellow-300 transition"
                style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn bg-orange-400 px-4 py-2 rounded-full hover:bg-yellow-300 flex-shrink-0 shadow"
              style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}
            >
              Sign in
            </Link>
          )}
        </nav>
        <div className="md:hidden">
          <IonIcon
            name={menuOpen === false ? "menu" : "close"}
            className="text-3xl cursor-pointer text-orange-500"
            onClick={() => setMenuOpen(!menuOpen)}
          ></IonIcon>
        </div>
        <div>
          {authState.isAuthenticated ? (
            <Link to={"/cart"}>
              <IonIcon name="cart-outline" className="text-3xl text-orange-500"></IonIcon>
            </Link>
          ) : (
            <Link to={"/login"}>
              <IonIcon name="cart-outline" className="text-3xl text-orange-500"></IonIcon>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;