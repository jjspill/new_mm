import dynamic from 'next/dynamic';

const AccountContainer = dynamic(() => import('./AccountContainer'), {
  ssr: false,
});

export default function Page() {
  return <AccountContainer />;
}
