import React from 'react';
import NavbarItems from '../components/Navigation/navitems/navbaritems';
import styles from './navbar.module.css';

const Navbar = ({
  toggle,
  isOpen,
  clicked,
}: {
  toggle: () => void;
  isOpen: boolean;
  clicked: boolean;
}) => {
  return (
    <>
      <div className="w-full h-16 bg-gray-800 fixed top-0 z-10">
        <div className="container mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex justify-center flex-grow">
              <NavbarItems />
            </div>
            <button
              type="button"
              title="Toggle Menu"
              className={`inline-flex items-center md:hidden mr-2 z-10 ${
                isOpen ? styles.rotateOpen : clicked ? styles.rotateClose : ''
              }`}
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
