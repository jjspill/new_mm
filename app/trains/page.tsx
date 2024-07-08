// pages/index.js
import React from 'react';
import { PageContainer } from '../components/templates/PageContainer';
import TrainsContainer from './TrainContainer';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import styles from './Train.module.css';

export const metadata = {
  title: 'MTA Train Times NYC - Live Subway Updates',
  description:
    'Get live MTA train times for all New York City subway stations. Check real-time arrivals and departures to plan your NYC commute efficiently. Click to see the latest updates!',
  keywords:
    'NYC MTA train times, live subway times NYC, real-time train schedule NYC, New York subway stations, NYC train routes',
  content: {
    'og:title': 'Live MTA Train Times in NYC - Instant Subway Updates',
    'og:description':
      'Access up-to-the-minute MTA train times for New York City. Plan your commute with live subway updates directly on your phone or desktop. See now!',
    'og:image': '/images/trains_og.jpg',
  },
};

const Home = async () => {
  return (
    <div>
      <TrainsContainer />
    </div>
  );
};

export default Home;
