'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/contexts/UserContext';
import { PageContainer } from '@/app/components/templates/PageContainer';

function ChangePasswordContainer() {
  const [username, setUsername] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const router = useRouter();

  const { user, setUser } = useUser();
  if (!user) {
    router.push('/login'); // Redirect to login if user is not authenticated
  }

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
      const response = await fetch(
        `${window.location.origin}/account/change-password/api`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
        },
      );

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
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={previousPassword}
                onChange={(e) => setPreviousPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
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
            <div>
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
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

export default ChangePasswordContainer;
