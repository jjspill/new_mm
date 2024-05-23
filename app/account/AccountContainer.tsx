'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../contexts/UserContext';
import { PageContainer } from '../components/templates/PageContainer';

const AccountContainer: React.FC = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  // Redirect logic handled inside useEffect
  React.useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, router]);

  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };

  const handleChangePasswordClick = () => {
    router.push('/account/change-password'); // Navigate to change password page
  };

  // Applying the portfolio styling template
  return (
    <PageContainer>
      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-center">
          Welcome, {user ? user.name : 'Unknown User'}
        </h1>
        <div className="text-center my-4">
          <p>Email: {user ? user.username : 'No username available'}</p>
          {/* <p>SUB: {user ? user.sub : 'No SUB available'}</p> */}
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log Out
          </button>
          <button
            onClick={handleChangePasswordClick}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change Password
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default AccountContainer;
