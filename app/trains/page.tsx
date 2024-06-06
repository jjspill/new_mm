// pages/index.js
import React from 'react';
import { PageContainer } from '../components/templates/PageContainer';
import TrainsContainer from './TrainContainer';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import styles from './Train.module.css';

export const metadata = {
  title: 'Train Times',
  description: 'Check the arrival times of trains at your station.',
  keywords:
    'trains, train times, arrival times, train schedule, train stations, train routes',
  content: {
    'og:title': 'Train Times',
    'og:description': 'Check the arrival times of trains at your station.',
    'og:image': '/images/trains_og.jpg',
  },
};

const Home = async () => {
  return (
    <PageContainer className="bg-[#FFEDD5]">
      <div>
        <TrainsContainer />
      </div>
    </PageContainer>
  );
};

export default Home;
