'use client';

import React, { useState } from 'react';
import styles from './about.module.css';
import SlideInFromRightComponent from '@/app/components/pageItems/slideInFromRight';
import Image from 'next/image';
import aboutJsonData from './about.json';
import AppearInComponent from '@/app/components/pageItems/appearInComponent';
import Link from 'next/link';
// import './animation.css';

const { aboutData, widgetData } = aboutJsonData;

const AnimationComponent = () => {
  return (
    <div className={`${styles.nameContainer} pt-40 min-w-full text-center`}>
      <h1>Hello!</h1>
      <h1>I&apos;m James</h1>
    </div>
  );
};

interface aboutItemProps {
  title: string;
  description: string;
  photo: string;
  photoLink?: string;
}

interface aboutWidgetProps {
  title: string;
  content: string[];
  photo?: string;
}

const AboutItem: React.FC<aboutItemProps> = ({
  title,
  description,
  photo,
  photoLink,
}) => {
  return (
    <div className="flex flex-col md:flex-row pb-6 space-x-0 md:space-x-4 items-center md:items-start">
      <div className="bg-gray-200 p-1 h-fit w-fit mb-4 md:mb-0">
        <div className="relative w-60 md:w-40 h-[20vh]">
          {photoLink && (
            <Link href={photoLink}>
              <Image
                src={photo}
                alt="Home"
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </Link>
          )}
          {!photoLink && (
            <Image
              src={photo}
              alt="Home"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          )}
        </div>
      </div>
      <div className="flex-1 ml-10">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-sm mb-4">{description}</p>
      </div>
    </div>
  );
};

const AboutWidget: React.FC<aboutWidgetProps> = ({ title, content, photo }) => {
  return (
    <div className="p-4 m-2 bg-white rounded-lg shadow-md hover:shadow-2xl transition duration-300 ease-in-out border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h3>
      <ul className="list-disc pl-5 space-y-1">
        {content.map((item, index) => (
          <li
            key={index}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function About() {
  return (
    <div className="flex justify-center pt-20 px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl mb-4">
        <div className="pb-40">
          <div className="relative w-full h-[56.25vw] md:h-[17.5vw]">
            <Image
              src="/images/flatirons_smaller.jpeg"
              alt="Friends"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>

          <AnimationComponent />
        </div>
        <div className="py-8 px-12">
          {aboutData.map((item, index) => (
            <React.Fragment key={index}>
              <SlideInFromRightComponent delay={0}>
                <AboutItem {...item} />
                {index < aboutData.length - 1 && (
                  <div
                    style={{
                      background:
                        'linear-gradient(to left, rgba(128, 128, 128, 0.5), rgba(255, 255, 255, 0.5))',
                      height: '4px',
                    }}
                    className="mb-8 md:mb-6"
                  ></div>
                )}
              </SlideInFromRightComponent>
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center items-center py-10">
          {widgetData.map((item, index) => (
            <AppearInComponent key={index} delay={index * 0.3}>
              <AboutWidget {...item} />
            </AppearInComponent>
          ))}
        </div>
      </div>
    </div>
  );
}
