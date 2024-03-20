'use client';

import React, { useState } from 'react';
import styles from './about.module.css';
import PopInComponent from '@/app/components/pageItems/popInContainer';
import Image from 'next/image';

type DropdownComponentProps = {
  buttonText: string;
  style?: string;
  children?: React.ReactNode;
};

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  buttonText,
  style,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`${style}`}>
      <button type="button" onClick={toggleVisibility} title={`${buttonText}`}>
        <div className="flex flex-row w-full">
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            ></path>
          </svg>
          {buttonText}
        </div>
      </button>

      {isVisible && children}
    </div>
  );
};

export default function About() {
  return (
    <div className="flex justify-center pt-20 px-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl mb-4">
        <Image
          src="/images/flatirons.png"
          alt="Friends"
          width={1200}
          height={900}
        />
        <div className="flex justify-center m-6">
          <div className="w-fit">
            <h1 className={`${styles.typewriter} text-6xl pt-20`}>
              Hello, my name is James!
            </h1>
          </div>
        </div>
        <div className="flex justify-center pt-20 ">
          <h1 className="text-5xl">About Me</h1>
        </div>
        <PopInComponent delay={-0.5}>
          <div className="p-2">
            <p>
              Hello! I&apos;m James, a Boulder, Colorado, native and a recent
              graduate from the University of Michigan. Since packing up my bags
              in Ann Arbor, I have settled into New York City to pursue a career
              in the tech industry.
            </p>
          </div>
        </PopInComponent>
        <div className="py-8">
          <div className="flex items-start space-x-8">
            <div className="flex">
              <div className="space-y-4">
                <Image
                  src="/path-to-your-home-image.jpg"
                  alt="Home"
                  width={200}
                  height={200}
                  className="bg-blue-500"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">Home</h1>
                <p className="text-lg mb-4">
                  This is some description about the home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
