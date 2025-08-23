import React, { useState } from "react";
import axios from "axios";

const SenkoTheme = {
  card: "max-w-md w-full mx-auto border-2 border-yellow-300 rounded-2xl p-8 bg-white shadow-xl",
  heading: "text-orange-500 text-xl font-bold mb-4 font-heading",
  label: "text-orange-700 text-sm font-medium mb-2 block font-content",
  input: "bg-yellow-50 border-2 border-yellow-300 w-full text-sm px-4 py-3 rounded-md outline-orange-400 font-content",
  error: "text-sm text-red-600 font-medium mt-2 font-content",
  button: "w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-orange-400 hover:bg-orange-500 focus:outline-none cursor-pointer font-content",
  buttonDisabled: "w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-yellow-300 focus:outline-none font-content",
  info: "text-center mb-8 text-orange-400 font-content",
};

const Verify = (props) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [fail, setFail] = useState(false);
  const [loading, setLoading] = useState(false);
  const isContinueButtonDisabled = !verificationCode || loading;

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFail(false);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/verify-code`,
        {
          email: props.email,
          code: verificationCode,
        }
      );
      if (response.status === 200) {
        props.handleVerified();
        props.setVerificationCode(verificationCode);
      }
    } catch (error) {
      setFail(true);
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:mt-8 mt-13" style={{ fontFamily: "'Poppins', 'Montserrat', Arial, sans-serif" }}>
      <div className="flex flex-col justify-center p-4">
        <div className={SenkoTheme.card}>
          <div className={SenkoTheme.info}>
            <img
              src="/Senko.png"
              alt="Senko Fox"
              className="mx-auto mb-2 w-14 h-14 rounded-full border-2 border-yellow-300 shadow"
            />
            <h2 className={SenkoTheme.heading}>
              Senko-san Verification
            </h2>
            <div>
              Một email xác minh đã được gửi tới địa chỉ của bạn.<br />
              Vui lòng nhập mã xác minh để tiếp tục.
            </div>
          </div>
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
                Verification failed. Please try again.
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;