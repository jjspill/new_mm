'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExperienceProps } from './experienceHelpers';
import Link from 'next/link';
import {
  IsClientCtxProvider,
  useIsClient,
} from '../../components/client-render/is_client_ctx';
import styles from './experience.module.css';
import debounce from 'lodash/debounce';

const RecPageItemAnimation: React.FC<ExperienceProps> = ({
  title,
  description,
  link,
}) => {
  const [animationClass, setAnimationClass] = useState('');
  const [blurAmount, setBlurAmount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);
  const beenVisible = useRef(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const observerCallback = debounce(([entry]) => {
      if (!hasMounted) return;
      const isFullyVisible = entry.intersectionRatio === 1;

      if (isFullyVisible) {
        beenVisible.current = true;
        setAnimationClass(styles.slideInFromBottom);
        return;
      }

      if (entry.isIntersecting) {
        if (entry.boundingClientRect.top > 0) {
          setAnimationClass(styles.slideInFromBottom);
        }
        setBlurAmount(0);
      }
    }, 100);

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
      rootMargin: '0px',
    });

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    const currentRef = animationRef.current;

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMounted]);

  return (
    <div
      className={`${animationClass} flex h-fit justify-center opacity-0`}
      ref={animationRef}
      style={{ filter: `blur(${blurAmount}px)` }}
    >
      <div className="flex flex-col py-4 px-4 my-2 bg-gray-100 shadow-lg rounded-2xl w-full">
        <h1 className="font-bold text-center">{title}</h1>
        <p className="text-center">{description}</p>
        <div className="flex justify-center">
          <Link href={`experience/${title}`}>
            <div
              className={`${styles.creepInBg} border border-black mt-2 p-2 rounded-full w-fit text-xs`}
            >
              Learn More
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const RecPageItem: React.FC<ExperienceProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <div className="flex h-fit justify-center">
      <div className="flex flex-col py-4 px-4 my-2 bg-gray-100 shadow-lg rounded-2xl w-full">
        <h1 className="font-bold text-center">{title}</h1>
        <p className="text-center">{description}</p>
        <div className="flex justify-center">
          <Link href={`experience/${title}`}>
            <p className="border border-black mt-2 p-2 rounded-full w-fit text-xs cursor-pointer">
              Learn More
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
// Assume each Experience component is 300px wide and 200px tall

const Experience: React.FC<
  ExperienceProps & { onExperienceClick: () => number } & {
    totalExperiences: number;
    screenWidth: number;
    screenHeight: number;
    index: number;
  }
> = ({
  title,
  description,
  link,
  onExperienceClick,
  totalExperiences,
  screenWidth,
  screenHeight,
  index,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(0.1);
  const [zIndex, setZIndex] = useState(10);
  const elementRef = useRef<HTMLDivElement>(null);

  const styleRef = useRef<{
    top: string;
    left: string;
    backgroundColor: string;
  }>();

  if (!styleRef.current) {
    styleRef.current = generateRandomStyle(
      totalExperiences,
      screenWidth,
      screenHeight,
      index,
    );
  }

  useEffect(() => {
    // Randomize scale duration
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
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = ((event.clientX - centerX) / window.innerWidth) * 60;
        const offsetY = ((event.clientY - centerY) / window.innerHeight) * 60;

        setRotateX(offsetX);
        setRotateY(-1 * offsetY);
      }
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
      className="flex flex-col items-center text-xl bg-white p-4 rounded-lg absolute w-fit h-fit max-h-[200px] shadow-lg"
      tabIndex={0}
      onClick={handleClick}
      style={{
        maxWidth: '300px',
        overflow: 'auto',
        zIndex: zIndex,
        ...styleRef.current,
      }}
    >
      <p className="font-bold text-center">{title}</p>
      <div className="text-sm w-fit text-center pt-2">{description}</div>
      <Link href={`experience/${title}`}>
        <div
          className={`${styles.creepInBg} border border-black mt-2 p-2 rounded-full w-fit text-xs`}
        >
          Learn More
        </div>
      </Link>
    </div>
  );
};

const componentWidth = 300;
const componentHeight = 200;

const generateRandomStyle = (
  totalExperiences: number,
  screenWidth: number,
  screenHeight: number,
  index: number,
): { left: string; top: string; backgroundColor: string } => {
  const maxTop = screenHeight - componentHeight - 20;
  let top = Math.random() * maxTop;
  if (top < 40) {
    top = 40 + Math.floor(Math.random() * 40);
  }

  const sectionWidth = screenWidth / totalExperiences;
  const sectionX = index * sectionWidth;
  const maxLeft = sectionWidth - componentWidth;
  let left = Math.random() * maxLeft + sectionX;

  if (left < 20) {
    left = 20 + Math.floor(Math.random() * 40);
  }

  if (left > screenWidth - componentWidth - 20) {
    left = screenWidth - componentWidth - 20;
  }

  const grayValue = Math.floor(Math.random() * 56) + 200;
  const grayColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;

  return {
    top: `${top}px`,
    left: `${left}px`,
    backgroundColor: grayColor,
  };
};

export const Experiences: React.FC<{ experiences: ExperienceProps[] }> = ({
  experiences,
}) => {
  // const experiences: ExperienceProps[] = experienceData;
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [isMobileView, setIsMobileView] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const [screenHeight, setScreenHeight] = useState<number | undefined>(
    undefined,
  );
  const [sortedExperiences, setSortedExperiences] = useState<ExperienceProps[]>(
    [],
  );

  useEffect(() => {
    const sorted = experiences.sort((a, b) => a.priority - b.priority);
    setSortedExperiences(sorted);
  }, [experiences]);

  useEffect(() => {
    // Ensure window object is available before attempting to access its properties
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);

      const handleResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const bringToFront = (): number => {
    setHighestZIndex(highestZIndex + 1);
    return highestZIndex + 1;
  };

  const toggleMobileView = () => {
    setIsMobileView(!isMobileView);
  };

  const isClient = useIsClient();
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

      <div className=" flex flex-col md:hidden pt-20 items-center">
        <div className="flex flex-col flex-grow px-4 py-2 mx-4 mb-4 lg:mx-80 bg-white shadow-lg rounded-2xl">
          {experiences?.map((experience, index) => (
            <RecPageItem key={index} {...experience} />
          ))}
        </div>
      </div>

      {isMobileView && (
        <div className="flex justify-center items-center">
          <div className="flex flex-col px-4 pt-20 ">
            <div className="bg-white overflow-hidden shadow-lg rounded-2xl w-full max-w-4xl px-4 py-2 mx-4 mb-4 lg:mx-80">
              {sortedExperiences.map((experience, index) => (
                <RecPageItemAnimation key={index} {...experience} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:flex justify-center items-center max-h-screen overflow-hidden">
        {isClient &&
          sortedExperiences.map((experience, index) => {
            return (
              <div
                key={index}
                className={`w-full ${
                  isMobileView ? 'block' : 'hidden'
                } md:block`}
              >
                {!isMobileView && (
                  <Experience
                    {...experience}
                    onExperienceClick={bringToFront}
                    totalExperiences={experiences.length}
                    screenWidth={screenWidth!}
                    screenHeight={screenHeight!}
                    index={index}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const ExperiencesContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <IsClientCtxProvider>{children}</IsClientCtxProvider>
    </div>
  );
};

export default ExperiencesContainer;
