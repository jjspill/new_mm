'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/app/components/templates/PageContainer';
import Link from 'next/link';
import { createUser, useUser } from '@/app/contexts/UserContext';
import { InputField } from '@/app/components/account/InputField';
import { SubmitButton } from '@/app/components/account/SubmitButton';

const ForgotPasswordContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
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
        body: JSON.stringify({ username: email }),
      });

      const data = await response.json();
      if (!data.error) {
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
        body: JSON.stringify({ username: email, code, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Your password has been reset successfully.');
        setUser(null);
        router.push('/login');
      } else {
        setError(data.error || 'Failed to reset password');
        setMessage('');
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
              <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required_prop={true}
              />
              <SubmitButton type="submit" label="Send Reset Link" />
            </form>
          ) : (
            <form onSubmit={handleChangePassword}>
              <InputField
                id="code"
                label="Verification Code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required_prop={true}
              />
              <InputField
                id="newPassword"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required_prop={true}
              />
              <InputField
                id="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required_prop={true}
              />
              <SubmitButton type="submit" label="Reset Password" />
            </form>
          )}
          <div className="mt-2 text-center">
            <Link href="/login">
              <span className="text-sm text-gray-800 hover:text-gray-500">
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
