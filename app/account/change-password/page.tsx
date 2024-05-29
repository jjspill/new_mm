'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/contexts/UserContext';
import { PageContainer } from '@/app/components/templates/PageContainer';
import { InputField } from '@/app/components/account/InputField';
import { SubmitButton } from '@/app/components/account/SubmitButton';

function ChangePasswordContainer() {
  const [username, setUsername] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const router = useRouter();
  const [origin, setOrigin] = useState<string>('');

  const { user, setUser } = useUser();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  React.useEffect(() => {
    setOrigin(typeof window !== 'undefined' ? window.location.origin : '');
  }, []);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords don't match");
      return;
    }

    // Assuming you have a password change API endpoint
    const body = JSON.stringify({
      username,
      previousPassword,
      newPassword,
      accessToken: user?.tokens.accessToken,
    });

    try {
      const response = await fetch(`${origin}/account/change-password/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });

      const data = await response.json();
      if (!data.error) {
        alert('Password changed successfully!');
        setUser(null);
      } else {
        console.error('Password change failed:', data.error);
        setFailureMessage(
          data.details.message || data.error.message || data.error,
        );
      }
    } catch (error) {
      console.error('Network error:', error);
      setFailureMessage('Failed to change password due to network error.');
    }
  };

  return (
    <PageContainer>
      <div className="flex items-center justify-center h-[80vh] bg-gray-100">
        <div className="p-6 max-w-sm w-full bg-white rounded shadow-md">
          {failureMessage && (
            <div className="text-red-500 text-center">{failureMessage}</div>
          )}
          <form onSubmit={handleChangePassword}>
            <InputField
              id="email"
              label="Email"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required_prop={true}
            />
            <InputField
              id="currentPassword"
              label="Current Password"
              type="password"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
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
            <SubmitButton type="submit" label="Change Password" />
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

export default ChangePasswordContainer;
