import { GolfHomePage } from './golfClient';

export const metadata = {
  title: 'The Golf Pool of Golf Pools',
  description: 'The Golf Pool of Golf Pools',
  openGraph: {
    title: 'The Golf Pool of Golf Pools',
    type: 'website',
    url: 'https://james-spillmann.com/golf',
    siteName: 'The Golf Pool of Golf Pools',
  },
};

const Home = async () => {
  return (
    <div>
      <GolfHomePage />
    </div>
  );
};

export default Home;
