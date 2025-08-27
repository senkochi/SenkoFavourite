import React, { useState } from 'react';
import Verify from '../components/Verify';
import axiosInstance from '../utils/axiosInstance';
import SenkoToast from '../components/SenkoToast';

const SenkoTheme = {
  bg: 'bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100',
  card: 'bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border-4 border-yellow-300',
  title: 'text-3xl font-bold text-center mb-6 text-orange-500',
  label: 'block text-orange-700 font-semibold',
  input: 'w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 bg-yellow-50',
  button: 'w-full bg-orange-400 text-white py-2 rounded-lg font-bold hover:bg-orange-500 transition',
  cancel: 'mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300',
  fox: 'mx-auto mb-4 w-20 h-20 rounded-full border-4 border-yellow-300 shadow-lg',
  animeFont: 'font-anime',
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [showVerify, setShowVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type }), 3000);
  };

  const handleSendVerificationEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `http://localhost:8080/api/send-recovery-code`,
        {
          email: email || "",
        }
      );
      if (response.status === 200) {
        setShowVerify(true);
        console.log("Verification email sent successfully");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      showToast("Failed to send verification email. Please try again.", "error");
      // Handle error, e.g., show a toast notification
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    handleSendVerificationEmail(e);
  };

  const handleVerifySuccess = () => {
    setShowVerify(false);
    setStep(2);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      console.log("Resetting password for email:", email);
      console.log("Using verification code:", verificationCode);
      console.log("Using new password:", password);
      const response = await axiosInstance.put(
        `http://localhost:8080/api/user/reset-password`,
        {
          email: email || "",
          verificationCode: verificationCode || "",
          password: password || "",
        }
      );
      if (response.status === 200) {
        console.log("Password reset successfully");
        showToast("Password reset successfully", "success");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      showToast("Failed to reset password. Please try again.", "error");
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${SenkoTheme.bg}`} style={{ fontFamily: 'var(--anime-font)' }}>
      <div className={SenkoTheme.card}>
        <img
          src="/Senko.png"
          alt="Senko Fox"
          className={SenkoTheme.fox}
        />
        <h2 className={SenkoTheme.title} style={{ fontFamily: 'var(--anime-font)' }}>
          Senko-san Password Helper
        </h2>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <label className={SenkoTheme.label} style={{ fontFamily: 'var(--anime-font)' }}>
              Nhập email để lấy lại mật khẩu
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={SenkoTheme.input}
              placeholder="Email của bạn"
              style={{ fontFamily: 'var(--anime-font)' }}
            />
            <button
              type="submit"
              className={SenkoTheme.button}
              style={{ fontFamily: 'var(--anime-font)' }}
            >
              Xác nhận
            </button>
          </form>
        )}

        {showVerify && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm border-2 border-yellow-300">
              <h3 className="text-orange-500 font-bold text-lg mb-2 text-center" style={{ fontFamily: 'var(--anime-font)' }}>
                Xác minh email
              </h3>
              <Verify email={email} handleVerified={handleVerifySuccess} setVerificationCode={setVerificationCode} />
              <button
                className={SenkoTheme.cancel}
                style={{ fontFamily: 'var(--anime-font)' }}
                onClick={() => setShowVerify(false)}
              >
                Huỷ
              </button>
            </div>
          </div>
        )}

        {toast.show && (
          <SenkoToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: '', type: 'info' })}
          />
        )}

        {step === 2 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <label className={SenkoTheme.label} style={{ fontFamily: 'var(--anime-font)' }}>
              Nhập mật khẩu mới
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={SenkoTheme.input}
              placeholder="Mật khẩu mới"
              style={{ fontFamily: 'var(--anime-font)' }}
            />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className={SenkoTheme.input}
              placeholder="Xác nhận mật khẩu"
              style={{ fontFamily: 'var(--anime-font)' }}
            />
            <button
              type="submit"
              className={SenkoTheme.button}
              style={{ fontFamily: 'var(--anime-font)' }}
            >
              Đổi mật khẩu
            </button>
          </form>
        )}
        <div className="mt-6 text-center text-orange-400 text-sm" style={{ fontFamily: 'var(--anime-font)' }}>
          <span>Senko-san luôn sẵn sàng giúp bạn lấy lại mật khẩu một cách dễ thương!</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;