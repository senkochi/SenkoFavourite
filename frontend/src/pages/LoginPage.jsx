import React, { useContext } from "react";
import LoginBackground from "../assets/login-back.png";
import Login from "../components/Login";
import Register from "../components/Register"; // Assuming you have a Register component
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [registerFail, setRegisterFail] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setLoginFail(false);
      const response = await axios.post(`http://localhost:8080/api/login`, {
        username: username,
        password: password,
      });
      console.log(`http://localhost:8080/api/login`);
      console.log("Response data:", response.data);
      if (response.status === 200) {
        const jwtToken = response.data; // Assuming the token is returned in the response
        // Assuming the response contains a token or user data
        console.log("Người dùng: ", username);
        console.log("Token: ", response.data);
        login(username, jwtToken);
        console.log("Người dùng: ", username);
        console.log("Token: ", response.data);
        toast.success("Login successful!");
        setLoading(false);
        navigate("/"); // Redirect to dashboard or home page
      } else {
        toast.error("Login failed. Please check your credentials.");
        setLoginFail(true);
      }
    } catch (err) {
      console.error("Login failed:", err);
      // Handle error, e.g., show a toast notification
      toast.error("Login failed. Please check your credentials.");
      setLoginFail(true);
    } finally {
      setLoading(false);
    }
  }

  const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setRegisterFail(false);
            const response = await axios.post(`http://localhost:8080/api/send-register-code`, {
                email: email
            });
            if (response.status === 200) {
              navigate('/verify-email', {
                state: { email: email }
              });
            }
        } catch (error) {
            setRegisterFail(true);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 page-container">
        <img
          src={LoginBackground}
          alt="Login background"
          className="object-cover object-center w-full h-full "
        />
        <div className="absolute inset-0 bg-black opacity-0"></div>
      </div>
      <div class="relative min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
              She's waiting for you!
            </h2>
            <p class="text-sm mt-6 text-slate-500 leading-relaxed">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
            <p class="text-sm mt-12 text-slate-500">
              Don't have an account{" "}
              <a
                onClick={() => setRegister(true)}
                class="text-blue-600 font-medium hover:underline ml-1"
              >
                Register here
              </a>
            </p>
          </div>
          <div>
            {register ? (
              <Register
                setRegister={setRegister}
                setEmail={setEmail}
                email={email}
                handleRegister={handleRegister}
                fail={registerFail}
              ></Register>
            ) : (
              <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              loading={loading}
              fail={loginFail}
            ></Login>
            )}
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
