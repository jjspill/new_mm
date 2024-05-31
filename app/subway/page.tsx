// pages/index.js
import React from 'react';
import LocationPrompt from './LocationPrompt';
import { PageContainer } from '../components/templates/PageContainer';

const Home = () => {
  return (
    <PageContainer>
      <div>
        <LocationPrompt />
      </div>
    </PageContainer>
  );
};

export default Home;
