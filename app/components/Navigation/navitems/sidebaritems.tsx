import { navData } from '@/utils/parseConfig';
import Link from 'next/link';

const SidebarNavItems = ({ toggle }: { toggle: () => void }): JSX.Element => {
  return (
    <ul className="text-center leading-relaxed text-xl">
      {navData.map((item, index) => (
        <li key={index}>
          <Link href={item.href} onClick={toggle}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNavItems;
