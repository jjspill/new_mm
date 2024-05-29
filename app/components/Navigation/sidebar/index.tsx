import { useEffect, useState } from 'react';
import NavItems from '../navitems/sidebaritems';
import styles from './sidenav.module.css';
const Sidebar = ({
  isOpen,
  toggle,
  clicked,
}: {
  isOpen: boolean;
  toggle: () => void;
  clicked: boolean;
}): JSX.Element => {
  console.log('isOpen', isOpen);
  console.log('clicked', clicked);
  return (
    <div
      className={`fixed w-full h-full overflow-hidden justify-center grid pt-[120px] left-0 z-10 ${
        isOpen
          ? styles.splashAnimation
          : clicked
            ? styles.hideSplashAnimation
            : ''
      }`}
      style={
        {
          // top: isOpen ? '0' : '-100%',
        }
      }
    >
      <div className="absolute top-20 w-full flex- flex-col">
        <NavItems toggle={toggle} />
      </div>
    </div>
  );
};

export default Sidebar;
