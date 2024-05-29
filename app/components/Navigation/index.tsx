'use client';
import { useState } from 'react';
import Navbar from '../../navbar';
import Sidebar from './sidebar';

const Navigation = () => {
  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    setClicked(true);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} clicked={clicked} toggle={toggle} />
      <Navbar isOpen={isOpen} clicked={clicked} toggle={toggle} />
    </>
  );
};

export default Navigation;
