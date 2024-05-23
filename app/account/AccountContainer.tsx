'use client';

// AccountPage.tsx
import React from 'react';
import { useUser } from '../contexts/UserContext';
import Link from 'next/link';
import { PageContainer } from '../components/templates/PageContainer';

const AccountContainer: React.FC = () => {
  const { user, setUser } = useUser();

  if (!user) {
    return (
      <PageContainer>
        <div>Please log in to view this page.</div>
        <Link href="/login">Log In</Link>
      </PageContainer>
    );
  }

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <PageContainer>
      <h1>Account Page</h1>
      <p>Welcome, {user.username}!</p>
      <div>
        <h3>Your tokens:</h3>
        <ul>
          <li>Access Token: {user.tokens.accessToken}</li>
          <li>Refresh Token: {user.tokens.refreshToken}</li>
          <li>ID Token: {user.tokens.idToken}</li>
        </ul>
      </div>
      <button onClick={handleLogout}>Log Out</button>
    </PageContainer>
  );
};

export default AccountContainer;
