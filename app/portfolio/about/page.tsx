'use client';

import React, { useState } from 'react';
import styles from './about.module.css';
import PopInComponent from '@/app/components/pageItems/popInContainer';
import SlideInFromRightComponent from '@/app/components/pageItems/slideInFromRight';
import Image from 'next/image';
import aboutJsonData from './about.json';
import AppearInComponent from '@/app/components/pageItems/appearInComponent';
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
}

interface aboutWidgetProps {
  title: string;
  content: string[];
  photo?: string;
}

const AboutItem: React.FC<aboutItemProps> = ({ title, description, photo }) => {
  return (
    <div className="flex pb-6">
      <div>
        <div className="bg-gray-200 p-1">
          <Image
            src={photo}
            alt="Home"
            width={200}
            height={200}
            className="bg-blue-500"
          />
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
    <div className="flex flex-col justify-center w-fit pl-4 pr-2">
      <h1 className="font-bold text-2xl border-b-2 border-black mb-2 text-center">
        {title}
      </h1>
      <ul className="list-disc">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
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
          <Image
            src="/images/flatirons.png"
            alt="Friends"
            width={1200}
            height={900}
          />
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
                    className="mb-6"
                  ></div>
                )}
              </SlideInFromRightComponent>
            </React.Fragment>
          ))}
        </div>
        <AppearInComponent delay={0}>
          <div className="flex justify-between items-center mx-12 py-40">
            {widgetData.map((item, index) => (
              <AboutWidget key={index} {...item} />
            ))}
          </div>
        </AppearInComponent>
      </div>
    </div>
  );
}
