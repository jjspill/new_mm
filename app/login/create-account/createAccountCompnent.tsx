'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser, useUser } from '@/app/contexts/UserContext';
import { InputField } from '@/app/components/account/InputField';
import { SubmitButton } from '@/app/components/account/SubmitButton';
import ReCAPTCHA from 'react-google-recaptcha';

function CreateAccountContainer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [origin, setOrigin] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const router = useRouter();

  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const { user, setUser } = useUser();

  React.useEffect(() => {
    if (user) {
      router.push('/account');
    }
  });

  React.useEffect(() => {
    setOrigin(typeof window !== 'undefined' ? window.location.origin : '');
  }, []);

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    recaptchaRef.current?.execute();
  };

  const onReCAPTCHASuccess = async (token: string | null) => {
    if (!token) {
      console.error('Failed to get reCAPTCHA token');
      return;
    }

    const body = JSON.stringify({
      email,
      username: email,
      password,
      attributes: { name },
    });

    try {
      const captchaResponse = await fetch('/login/create-account/api/captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const captchaData = await captchaResponse.json();
      if (!captchaData.success) {
        console.error('reCAPTCHA failed:', captchaData);
        setFailureMessage('reCAPTCHA failed');
        return;
      }

      setFailureMessage('');
      const response = await fetch(`${origin}/login/create-account/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      const data = await response.json();
      if (!data.error) {
        setUser(createUser(email, data));
        router.push('/login');
      } else {
        console.error('Account creation failed:', data);
        setFailureMessage(
          data?.details?.message || data?.message || 'Account creation failed',
        );
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-fit md:h-[80vh] bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white rounded shadow-md">
        {failureMessage && (
          <div className="text-red-500 text-center">{failureMessage}</div>
        )}
        <form onSubmit={handleCreateAccount}>
          <InputField
            id="name"
            label="Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required_prop={true}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required_prop={true}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required_prop={true}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required_prop={true}
          />
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            onChange={onReCAPTCHASuccess}
            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
          />
          <div className="mt-6">
            <SubmitButton type="submit" label="Create Account" />
          </div>
        </form>
        <div className="mt-2 text-center">
          <Link href="/login">
            <div className="text-sm text-gray-800 hover:text-gray-500">
              Already have an account? Log in
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountContainer;
