  import React from "react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useLocation } from "react-router-dom";
  import axios from "axios";

  const EmailVerification = () => {
    const location = useLocation();
    const [verificationCode, setVerificationCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(location.state?.email || "");
      const [cpassword, setCPassword] = useState("");
    const [verified, setVerified] = useState(false);
    const [fail, setFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const isContinueButtonDisabled = !verificationCode || loading;
    const isConfirmButtonDisabled = !username || !password || !cpassword || loading;
    const navigate = useNavigate();
    

    const handleVerification = async (e) => {
      e.preventDefault();
      setLoading(true);
      setFail(false);
      // Handle the verification logic here, e.g., send the code to the backend
      // and navigate to the next step if successful.
      try {
        const response = await axios.post(
          `http://localhost:8080/api/verify-code`,
          {
            email: email,
            code: verificationCode,
          }
        );
        if (response.status === 200) {
          // Navigate to the next page or show success message
          setVerified(true);
        }
      } catch (error) {
          setFail(true);
        console.error("Verification failed:", error);
        // Handle error, e.g., show a toast notification
      } finally {
        setLoading(false);
      }
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      setFail(false);
      if (password !== cpassword) {
        setFail(true);
        setLoading(false);
        console.log("Mật khẩu không khớp");
        return;
      }
      try {
          const response = await axios.post(
              `http://localhost:8080/api/register`,
              {
              username: username,
              password: password,
              email: email
              }
          );
          if (response.status === 200) {
              // Registration successful, navigate to login or home page
              console.log("Đăng ký thành công");
              navigate("/login");
          }
      } catch (error) {
          console.error("Registration failed:", error);
          setFail(true);
      } finally {
          setLoading(false);
      }
    }

    return (
      <div className="md:mt-8 mt-13">
        <div class="flex flex-col justify-center sm:h-screen p-4">
          <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
            <div class="text-center mb-12">
              <h2>A verification email has been sent to your email address.</h2>
            </div>
            {verified ? (
              <form onSubmit={handleRegister}>
                <div class="space-y-6">
                  <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">
                      Username
                    </label>
                    <input
                      name="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      class="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      class="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Enter password"
                    />
                  </div>
                  <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">
                      Confirm Password
                    </label>
                    <input
                      name="cpassword"
                      type="password"
                      value={cpassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      class="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Enter confirm password"
                    />
                  </div>
                </div>

                <div class={`text-sm text-red-600 font-bold ${!fail ? 'hidden' : 'block'}`}>
                  Password does not match. Please try again.
                </div>

                <div class="mt-12">
                  <button
                    type="submit"
                    class={`w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white ${isConfirmButtonDisabled ? 'bg-blue-500 focus:outline-none' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer'}`}
                    disabled={isConfirmButtonDisabled}
                  >
                    Confirm
                  </button>
                </div>
                <p class="text-slate-600 text-sm mt-6 text-center">
                  Already have an account?{" "}
                  <a
                    onClick={() => navigate('/login')}
                    class="text-blue-600 font-medium hover:underline ml-1"
                  >
                    Login here
                  </a>
                </p>
              </form>
            ) : (
              <form onSubmit={handleVerification}>
                <div class="space-y-6">
                  <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">
                      Verification Code
                    </label>
                    <input
                      name="verificationCode"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      class="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Enter code"
                    />
                  </div>
                </div>

                <div class={`text-sm text-red-600 font-bold ${!fail ? 'hidden' : 'block'}`}>
                  Verification failed. Please try again.
                </div>

                <div class="mt-12">
                  <button
                  type="submit"
                  className ={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white
                  ${isContinueButtonDisabled ? 'bg-blue-500 focus:outline-none' : ' bg-blue-600  hover:bg-blue-700 focus:outline-none cursor-pointer' }`}
                  disabled={isContinueButtonDisabled}
                >
                  Continue
                </button>
                </div>
                <p class="text-slate-600 text-sm mt-6 text-center">
                  Already have an account?{" "}
                  <a
                    onClick={() => navigate('/login')}
                    class="text-blue-600 font-medium hover:underline ml-1"
                  >
                    Login here
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default EmailVerification;
