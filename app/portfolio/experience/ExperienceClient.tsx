'use client';

import React, { useState, useEffect, useRef, PropsWithChildren } from 'react';
import {
  ExperienceProps,
  Position,
  checkForFirstOverlap,
  measureAndStorePosition,
  shuffleArray,
} from './experienceHelpers';
import Link from 'next/link';
import {
  IsClientCtxProvider,
  useIsClient,
} from '../../components/client-render/is_client_ctx';
import styles from './experience.module.css';
import { LinkedInExperience, LinkedInRecPage } from './LinkedInExperience';
import { GitHubExperience, GitHubRecPage } from './GitHubExperience';

const RecPageItem: React.FC<ExperienceProps> = ({
  id,
  title,
  description,
  long_text,
  link,
}) => {
  if (id === 'LinkedIn') {
    return (
      <LinkedInRecPage
        profileUrl={link}
        name={title}
        headline={description}
        background={long_text}
        imagePath="/images/linkedin_profile.jpeg"
      />
    );
  } else if (id === 'GitHub') {
    return (
      <GitHubRecPage
        profileUrl={link}
        title={title}
        description={description}
      />
    );
  }

  return (
    <div className="flex h-fit justify-center my-2">
      <div className="flex flex-col bg-gray-100 shadow-lg rounded-2xl w-full">
        <h1 className="flex items-center justify-center py-1 min-h-10 font-semibold text-center text-xl bg-gray-200 rounded-t-2xl">
          {title}
        </h1>
        <div className="p-4">
          <p className="text-center">{description}</p>
          <div className="flex justify-center">
            <Link href={`experience/${title}`}>
              <p
                className={`${styles.creepInBg} border border-black mt-2 p-2 rounded-full w-fit text-xs cursor-pointer`}
              >
                Learn More
              </p>
            </Link>
          </div>
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
  id,
  title,
  description,
  long_text,
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
      className="flex flex-col items-center text-xl bg-white rounded-lg absolute w-fit h-fit max-h-[220px] shadow-lg"
      tabIndex={0}
      onClick={handleClick}
      style={{
        maxWidth: '330px',
        overflow: 'auto',
        zIndex: zIndex,
        ...styleRef.current,
      }}
    >
      {id === 'LinkedIn' ? (
        <LinkedInExperience
          profileUrl={link}
          name={title}
          headline={description}
          background={long_text}
          imagePath="/images/linkedin_profile.jpeg"
        />
      ) : id === 'GitHub' ? (
        <GitHubExperience
          profileUrl={link}
          title={title}
          description={description}
        />
      ) : (
        <div className="flex flex-col items-center h-fit w-fit">
          <div className="flex justify-center items-center bg-gray-200 min-h-10 w-full">
            <p className="font-semibold text-center">{title}</p>
          </div>
          <div className="p-4 py-2 flex flex-col items-center">
            <div className="text-sm w-fit text-center pt-1">{description}</div>
            <Link href={`experience/${title}`}>
              <div
                className={`${styles.creepInBg} border border-black mt-2 p-2 rounded-full w-fit text-xs`}
              >
                Learn More
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const componentWidth = 330;
const componentHeight = 220;

export const generateRandomStyle = (
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

  if (left > screenWidth - componentWidth - 30) {
    left = screenWidth - componentWidth - 30;
  }

  // const grayValue = Math.floor(Math.random() * 56) + 200;
  // const grayColor = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;

  return {
    top: `${top}px`,
    left: `${left}px`,
    backgroundColor: 'white',
  };
};

export const Experiences: React.FC<{ experiences: ExperienceProps[] }> = ({
  experiences,
}) => {
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [isMobileView, setIsMobileView] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const [screenHeight, setScreenHeight] = useState<number | undefined>(
    undefined,
  );
  const [sortedExperiences, setSortedExperiences] = useState<ExperienceProps[]>(
    [],
  );
  const [shuffledExperiences, setShuffledExperience] = useState<
    ExperienceProps[]
  >([]);

  const [animationComplete, setAnimationComplete] = useState(false); // Start with `false`
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Overlapping experiences on desktop stuff
  const [overlapDetected, setOverlapDetected] = useState(false);
  const positionsRef = useRef<{ [key: number]: Position }>({});

  useEffect(() => {
    const sorted = experiences?.sort((a, b) => {
      const priorityA = a.priority ?? Number.MAX_SAFE_INTEGER;
      const priorityB = b.priority ?? Number.MAX_SAFE_INTEGER;
      return priorityA - priorityB;
    });
    setShuffledExperience(shuffleArray(sorted));
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

      {/* For mobile */}
      <div className=" flex flex-col md:hidden pt-20 items-center">
        <div className="overflow-hidden rounded-2xl w-full max-w-4xl px-4 pb-2 lg:mx-80">
          {sortedExperiences?.map((experience, index) => (
            <RecPageItem key={index} {...experience} />
          ))}
        </div>
      </div>

      {isMobileView && (
        <div className="flex justify-center items-center">
          <div className="flex flex-col px-4 pt-20 ">
            <div className="overflow-hidden rounded-2xl w-full max-w-4xl px-2 mx-4 mb-2 lg:mx-80">
              {sortedExperiences.map((experience, index) => (
                <RecPageItem key={index} {...experience} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:flex justify-center items-center max-h-screen overflow-hidden">
        {isClient &&
          shuffledExperiences.map((experience, index) => {
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) {
                    measureAndStorePosition(index, el, positionsRef);
                    checkForFirstOverlap(
                      positionsRef,
                      setOverlapDetected,
                      'messageShown',
                    );
                  }
                }}
                className={`w-full ${isMobileView ? 'block' : 'hidden'} md:block`}
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
        {overlapDetected && animationComplete && (
          <div className="fixed top-5 right-5 bg-black bg-opacity-50 p-4 rounded-lg shadow-lg max-w-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
              <p className="text-lg text-center text-gray-800 mb-4">
                Click any overlapping experience tile to bring it to the front.
              </p>
              <button
                type="button"
                onClick={() => setOverlapDetected(false)}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-800 hover:text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
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
