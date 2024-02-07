import { navData } from '@/utils/parseConfig';
import Link from 'next/link';

const NavbarItems = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
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
