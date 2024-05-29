'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../contexts/UserContext';
import { PageContainer } from '../components/templates/PageContainer';

const AccountContainer: React.FC = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    setUser(null);
  };

  const handleChangePasswordClick = () => {
    router.push('/account/change-password');
  };
  return (
    <PageContainer>
      <div className="px-2 pt-4 pb-2">
        <h1 className="text-xl font-semibold text-center">
          Welcome, {user ? user.name : 'Unknown User'}
        </h1>
        <div className="text-center my-4">
          <p>Email: {user ? user.username : 'No email available'}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleLogout}
            className="flex justify-center bg-gray-200 hover:bg-gray-300 py-4 px-4 rounded-xl shadow-sm text-sm font-medium"
          >
            Log Out
          </button>
          <button
            onClick={handleChangePasswordClick}
            className="flex justify-center bg-gray-200 hover:bg-gray-300 py-4 px-4 rounded-xl shadow-sm text-sm font-medium"
          >
            Change Password
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default AccountContainer;
