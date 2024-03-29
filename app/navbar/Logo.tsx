'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from './Button';

const Logo = () => {
  // change between the logo and the button when the user scrolls
  const [showButton, setShowButton] = useState(false);

  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavButton);
  }, []);

  return <>
    <Link href="/" style={{ display: showButton ? 'none' : 'block' }}>
      <Image
        src="/images/jaycircle.png"
        alt="Logo"
        width="100"
        height="200"
        background-size="cover"
        className="relative"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </Link>
    <div
      style={{
        display: showButton ? 'block' : 'none',
      }}
    >
      <Button />
    </div>
  </>;
};

export default Logo;
