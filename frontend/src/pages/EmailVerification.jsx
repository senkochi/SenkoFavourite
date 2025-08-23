import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SenkoTheme = {
  card: "max-w-md w-full mx-auto border-2 border-yellow-300 rounded-2xl p-8 bg-white shadow-xl",
  heading: "text-orange-500 text-2xl font-bold mb-4 font-heading",
  label: "text-orange-700 text-sm font-medium mb-2 block font-content",
  input: "bg-yellow-50 border-2 border-yellow-300 w-full text-sm px-4 py-3 rounded-md outline-orange-400 font-content",
  error: "text-sm text-red-600 font-medium mt-2 font-content",
  button: "w-full shadow-xl py-3 px-4 text-sm font-semibold rounded text-white bg-orange-400 hover:bg-orange-500 focus:outline-none cursor-pointer font-content",
  buttonDisabled: "w-full shadow-xl py-3 px-4 text-sm font-semibold rounded text-white bg-yellow-300 focus:outline-none font-content",
  info: "text-center mb-8 text-orange-400 font-content",
  link: "text-orange-500 font-medium hover:underline ml-1 cursor-pointer font-content",
};

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
    try {
      const response = await axios.post(
        `http://localhost:8080/api/verify-code`,
        {
          email: email,
          code: verificationCode,
        }
      );
      if (response.status === 200) {
        setVerified(true);
      }
    } catch (error) {
      setFail(true);
      console.error("Verification failed:", error);
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
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/register`,
        {
          username: username,
          password: password,
          email: email,
        }
      );
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setFail(true);
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:mt-8 mt-13" style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}>
      <div className="flex flex-col justify-center sm:h-screen p-4">
        <div className={SenkoTheme.card}>
          <div className={SenkoTheme.info}>
            <img
              src="/Senko.png"
              alt="Senko Fox"
              className="mx-auto mb-2 w-16 h-16 rounded-full border-2 border-yellow-300 shadow"
            />
            <h2 className={SenkoTheme.heading}>
              Senko-san Email Verification
            </h2>
            <div>
              Một email xác minh đã được gửi tới địa chỉ của bạn.<br />
              Vui lòng nhập mã xác minh để tiếp tục đăng ký.
            </div>
          </div>
          {verified ? (
            <form onSubmit={handleRegister}>
              <div className="space-y-6">
                <div>
                  <label className={SenkoTheme.label}>
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={SenkoTheme.input}
                    placeholder="Nhập username"
                  />
                </div>
                <div>
                  <label className={SenkoTheme.label}>
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={SenkoTheme.input}
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                <div>
                  <label className={SenkoTheme.label}>
                    Confirm Password
                  </label>
                  <input
                    name="cpassword"
                    type="password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    className={SenkoTheme.input}
                    placeholder="Xác nhận mật khẩu"
                  />
                </div>
              </div>
              {fail && (
                <div className={SenkoTheme.error}>
                  Mật khẩu xác nhận không khớp hoặc đăng ký thất bại. Vui lòng thử lại.
                </div>
              )}
              <div className="mt-8">
                <button
                  type="submit"
                  className={isConfirmButtonDisabled ? SenkoTheme.buttonDisabled : SenkoTheme.button}
                  disabled={isConfirmButtonDisabled}
                >
                  Confirm
                </button>
              </div>
              <p className="text-slate-600 text-sm mt-6 text-center font-content">
                Đã có tài khoản?{" "}
                <span
                  onClick={() => navigate('/login')}
                  className={SenkoTheme.link}
                >
                  Đăng nhập ngay
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerification}>
              <div className="space-y-6">
                <div>
                  <label className={SenkoTheme.label}>
                    Verification Code
                  </label>
                  <input
                    name="verificationCode"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className={SenkoTheme.input}
                    placeholder="Nhập mã xác minh"
                  />
                </div>
              </div>
              {fail && (
                <div className={SenkoTheme.error}>
                  Xác minh thất bại. Vui lòng thử lại.
                </div>
              )}
              <div className="mt-8">
                <button
                  type="submit"
                  className={isContinueButtonDisabled ? SenkoTheme.buttonDisabled : SenkoTheme.button}
                  disabled={isContinueButtonDisabled}
                >
                  Continue
                </button>
              </div>
              <p className="text-slate-600 text-sm mt-6 text-center font-content">
                Đã có tài khoản?{" "}
                <span
                  onClick={() => navigate('/login')}
                  className={SenkoTheme.link}
                >
                  Đăng nhập ngay
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;