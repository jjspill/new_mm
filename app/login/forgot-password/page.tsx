'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/app/components/templates/PageContainer';
import Link from 'next/link';
import { createUser, useUser } from '@/app/contexts/UserContext';

const ForgotPasswordContainer: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showResetForm, setShowResetForm] = useState<boolean>(false);
  const router = useRouter();
  const [origin, setOrigin] = useState<string>('');
  const { user, setUser } = useUser();

  React.useEffect(() => {
    if (user) {
      router.push('/account');
    }
  }, [user, router]);

  useEffect(() => {
    setOrigin(typeof window !== 'undefined' ? window.location.origin : '');
  }, []);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${origin}/login/forgot-password/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Please check your email to reset your password.');
        setError('');
        setShowResetForm(true);
      } else {
        setError(data.error || 'Failed to send reset password link');
        setMessage('');
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error, please try again.');
      setMessage('');
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await fetch(`${origin}/login/forgot-password/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, code, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Your password has been reset successfully.');
        setUser(createUser(username, data));

        router.push('/login');
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error, please try again.');
    }
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-center h-[80vh] bg-gray-100">
        <div className="p-6 max-w-sm w-full bg-white rounded shadow-md">
          {error && <div className="text-red-500 text-center">{error}</div>}
          {message && (
            <div className="text-green-500 text-center">{message}</div>
          )}
          {!showResetForm ? (
            <form onSubmit={handleForgotPassword}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleChangePassword}>
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}
          <div className="mt-2 text-center">
            <Link href="/login">
              <span className="text-sm text-indigo-600 hover:text-indigo-500">
                Remembered your password? Log in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ForgotPasswordContainer;
