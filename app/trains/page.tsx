// pages/index.js
import React from 'react';
import { PageContainer } from '../components/templates/PageContainer';
import TrainsContainer from './TrainContainer';

const Home = () => {
  return (
    <PageContainer>
      <div>
        <TrainsContainer />
      </div>
    </PageContainer>
  );
};

export default Home;
