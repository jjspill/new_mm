import RecPageItem from './components/pageItems/recPageItem';

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-col pt-20">
        <div className="flex flex-col flex-grow p-4 m-4 lg:mx-80 bg-white shadow-lg rounded-2xl">
          <RecPageItem />
          <RecPageItem />
          <RecPageItem />
          <RecPageItem />
          <RecPageItem />
        </div>
      </div>
    </div>
  );
}
