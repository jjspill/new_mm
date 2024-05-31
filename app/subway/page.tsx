// pages/index.js
import React from 'react';
import { PageContainer } from '../components/templates/PageContainer';
import SubwayContainer from './SubwayContainer';

const Home = () => {
  return (
    <PageContainer>
      <div>
        <SubwayContainer />
      </div>
    </PageContainer>
  );
};

export default Home;
