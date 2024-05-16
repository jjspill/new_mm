import RecPageItem from './components/pageItems/recPageItem';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  redirect('/portfolio');
  // ...
}

// export default function HomePage() {
//   return (
//     <div>
//       <div className="flex flex-col pt-20">
//         <div className="flex flex-col flex-grow p-4 m-4 lg:mx-80 bg-white shadow-lg rounded-2xl">
//           <RecPageItem bgColor="bg-red-500" />
//           <RecPageItem bgColor="bg-blue-500" />
//           <RecPageItem bgColor="bg-green-500" />
//           <RecPageItem bgColor="bg-yellow-400" />
//           <RecPageItem />
//         </div>
//       </div>
//     </div>
//   );
// }
