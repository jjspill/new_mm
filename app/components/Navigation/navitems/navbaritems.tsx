import { navData } from '@/utils/parseConfig';
import Link from 'next/link';

const NavbarItems = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
      <div className="absolute top-0 left-4 h-16 flex items-center justify-center">
        <Link href="/account">
          <svg
            className="h-8 w-auto text-white"
            data-slot="icon"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </div>
      <ul className="hidden md:flex gap-x-6 text-white">
        {navData.map((item, index) => (
          <li key={index} className="hover:text-gray-400">
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarItems;
