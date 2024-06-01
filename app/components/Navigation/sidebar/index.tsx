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
  return (
    <div
      className={`fixed w-full h-full overflow-hidden justify-center grid left-0 md:hidden ${
        isOpen
          ? styles.splashAnimation
          : clicked
            ? styles.hideSplashAnimation
            : ''
      }`}
      style={{ top: isOpen || clicked ? '0' : '-100%' }}
      // style={
      //   {
      //     // top: isOpen ? '0' : '-100%',
      //   }
      // }
    >
      {clicked && (
        <div className="absolute top-20 w-full flex- flex-col">
          <NavItems toggle={toggle} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
