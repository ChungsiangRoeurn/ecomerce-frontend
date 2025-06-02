'use client';

import React, { useState } from 'react';
import ForgetPasswordHandler from '@/actions/signIn/forgetpassword';
import ForgetPassverifyOTP from '@/actions/signIn/forgetpass-verifyOTP';
import ResetPassword from '@/actions/signIn/resetPassword'; // Your reset password API action
import { FaXmark } from 'react-icons/fa6';
import { createPortal } from 'react-dom';

const ForgetPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(null);
    try {
      const response = await ForgetPasswordHandler({ email });
      setIsSuccess(response.success);
      setMessage(response.data?.message || '');
      if (response.success) {
        setStep('otp');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Failed to send reset email. Please try again.');
      console.error('Send email error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(null);
    try {
      const res = await ForgetPassverifyOTP({ email, otp });
      if (res.success) {
        setMessage('OTP verified successfully! You can now reset your password.');
        setIsSuccess(true);
        setStep('newPassword');
      } else {
        setMessage(res.data?.message || 'OTP verification failed.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('OTP verification failed due to error.');
      setIsSuccess(false);
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(null);

    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      setIsSuccess(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    try {
      const res = await ResetPassword({ email, newPassword });
      console.log("response:", res);
      if (res.success) {
        setMessage('Password reset successful!');
        setIsSuccess(true);
        alert('Password reset successful! You can now log in with your new password.');
        window.location.href = '/singIn'; // Redirect after success
      } else {
        setMessage(res.data?.message || 'Password reset failed.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('An error occurred while resetting password.');
      setIsSuccess(false);
      console.error('Error resetting password:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    setIsSuccess(null);
    setStep('email');
  };

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <FaXmark size={18} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Reset Password</h2>

        {step === 'email' && (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
                autoFocus
              />
            </div>

            {message && (
              <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded-md ${
                loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'
              }`}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none tracking-widest text-center"
                placeholder="6-digit code"
                maxLength={6}
                autoFocus
              />
            </div>
            {message && (
              <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-white font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {step === 'newPassword' && (
          <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="New password"
                minLength={8}
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Confirm password"
                minLength={8}
              />
            </div>
            {message && (
              <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded-md ${
                loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'
              }`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full flex justify-end">
        <span
          onClick={() => {
            setShowModal(true);
            setStep('email');
        }}
          className="text-xs text-gray-500 cursor-pointer hover:underline hover:underline-offset-1 hover:text-gray-700"
        >
          Forgot password?
        </span>
      </div>
      {showModal && typeof window !== 'undefined' && createPortal(modal, document.body)}
    </>
  );
};

export default ForgetPassword;
