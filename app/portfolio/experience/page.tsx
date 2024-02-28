'use client';

import React, { useState, useEffect, useRef } from 'react';
import experienceData from './experiences.json';
import { ExperienceProps } from './experienceProps';
import Link from 'next/link';

const RecPageItem: React.FC<ExperienceProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <div className="flex flex-grow min-h-40">
      <div className="flex flex-col w-full py-4 px-2 my-2 bg-gray-100 shadow-lg rounded-2xl">
        <h1 className="font-bold text-center">{title}</h1>
        <p>{description}</p>
        <Link href={`experience/${title}`} className="text-sm text-blue-500">
          Learn More
        </Link>
      </div>
    </div>
  );
};

const generateRandomStyle = (): React.CSSProperties => {
  const maxHeightPercentage = 70;
  const maxWidthPercentage = 70;

  const grayValue = Math.floor(Math.random() * 56) + 200;
  const grayColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;

  return {
    top: `${Math.random() * maxHeightPercentage + 5}%`,
    left: `${Math.random() * maxWidthPercentage + 5}%`,
    position: 'absolute',
    backgroundColor: grayColor,
  };
};

const Experience: React.FC<
  ExperienceProps & { onExperienceClick: () => number }
> = ({ title, description, link, onExperienceClick }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(0.1);
  const [zIndex, setZIndex] = useState(1);
  const elementRef = useRef<HTMLDivElement>(null);

  const initialStyles = useRef(generateRandomStyle()).current;

  useEffect(() => {
    if (elementRef.current) {
      for (const [key, value] of Object.entries(initialStyles)) {
        elementRef.current.style[key as any] = value;
      }
    }

    const scaleDuration = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
    let startTime: number | null = null;

    const animateScale = (time: number) => {
      if (!startTime) startTime = time;
      const elapsedTime = time - startTime;
      const fraction = Math.min(elapsedTime / scaleDuration, 1);

      setScale((prevScale) => Math.max(prevScale, 0.1 + fraction * (1 - 0.1)));

      if (fraction < 1) {
        requestAnimationFrame(animateScale);
      }
    };

    requestAnimationFrame(animateScale);

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const middleX = window.innerWidth / 2;
      const middleY = window.innerHeight / 2;
      const offsetX = ((x - middleX) / middleX) * 45;
      const offsetY = ((y - middleY) / middleY) * 45;

      setRotateX(offsetX);
      setRotateY(-1 * offsetY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.transform = `scale(${scale}) perspective(5000px) rotateY(${rotateX}deg) rotateX(${rotateY}deg)`;
    }
  }, [rotateX, rotateY, scale]);

  const handleClick = () => {
    setZIndex(onExperienceClick());
  };

  return (
    <div
      ref={elementRef}
      className="text-xl bg-white p-4 rounded-lg absolute"
      tabIndex={0}
      onClick={handleClick}
      style={{
        maxWidth: '300px',
        overflow: 'auto',
        zIndex: zIndex,
      }}
    >
      <p className="font-bold text-center">{title}</p>
      <div className="text-sm">{description}</div>
      <Link href={`experience/${title}`} className="text-sm text-blue-500">
        Learn More
      </Link>
    </div>
  );
};

const Experiences: React.FC = () => {
  const experiences: ExperienceProps[] = experienceData;
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);

  const bringToFront = (): number => {
    setHighestZIndex(highestZIndex + 1);
    return highestZIndex + 1;
  };

  const toggleMobileView = () => {
    setIsMobileView(!isMobileView);
  };

  return (
    <div>
      <div className="fixed top-0 right-0 z-10 h-16 flex justify-end">
        <button
          className="p-2 mr-6 text-white rounded hidden md:block hover:text-gray-400"
          onClick={toggleMobileView}
        >
          Toggle View
        </button>
      </div>

      <div className="md:hidden sm:flex flex-col pt-20">
        <div className="flex flex-col flex-grow p-4 m-4 lg:mx-80 bg-white shadow-lg rounded-2xl">
          {experiences.map((experience, index) => (
            <RecPageItem key={index} {...experience} />
          ))}
        </div>
      </div>

      {isMobileView && (
        <div className="flex flex-col pt-20">
          <div className="flex flex-col flex-grow p-4 m-4 lg:mx-80 bg-white shadow-lg rounded-2xl">
            {experiences.map((experience, index) => (
              <RecPageItem key={index} {...experience} />
            ))}
          </div>
        </div>
      )}

      <div className="hidden md:flex justify-center items-center max-h-screen overflow-hidden">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`w-full ${isMobileView ? 'block' : 'hidden'} md:block`}
          >
            {!isMobileView && (
              <Experience {...experience} onExperienceClick={bringToFront} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
