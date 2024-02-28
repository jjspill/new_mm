'use client';

import React, { useState, useEffect, useRef } from 'react';
import experienceData from './experiences.json';

interface ExperienceProps {
  title: string;
  description: string;
  link?: string;
}

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
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs"
        >
          Learn More
        </a>
      )}
    </div>
  );
};

const Experiences: React.FC = () => {
  const experiences: ExperienceProps[] = experienceData;
  const [highestZIndex, setHighestZIndex] = useState(1);

  const bringToFront = (): number => {
    setHighestZIndex(highestZIndex + 1);
    return highestZIndex + 1;
  };

  return (
    <div className="flex justify-center items-center max-h-screen overflow-hidden">
      {experiences.map((experience, index) => (
        <Experience
          key={index}
          {...experience}
          onExperienceClick={bringToFront}
        />
      ))}
    </div>
  );
};

export default Experiences;
