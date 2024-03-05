'use client';

import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="flex justify-center pt-20 px-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl mb-4">
        <div className="flex justify-center mt-6">
          <div className="w-fit h-fit bg-gray-200 p-2 rounded-xl font-bold text-3xl">
            James Spillmann
          </div>
        </div>
        <div className="p-6">
          {/* Image container floated to the right */}
          <div className="bg-gray-200 rounded-xl">
            <div className="relative rounded-xl bg-gray-200 overflow-hidden w-96 h-96 float-right ml-6 mb-4">
              <Image
                src="/images/james_portrait.png" // Replace with your photo path
                alt="Profile Photo"
                objectFit="cover"
                className="rounded-xl p-2"
                fill
              />
            </div>
            {/* Text content */}
            <div className="flex justify-center">
              <div className="w-fit h-fit  p-2 font-bold">Background</div>
            </div>
            <p className="p-2 text-sm">
              Hello! I&apos;m James, a Boulder, Colorado, native and a recent
              graduate from the University of Michigan. Since packing up my bags
              in Ann Arbor, I have settled into New York City to pursue a career
              in the tech industry.
              <br />
              <br />
              Upon arrival, with no job lined up (due to unforeseen
              circumstances), I took my talents to the fine establishment of
              Locanda Verde. After working with stars such as Robert Di Nero,
              Ryan Reynolds, Frank Ocean, and many more, I decided to take my
              talents back, to the tech industry.
              <br />
              <br />
              Recently, at SPACInsider, my work has centered on crafting
              flexible technological solutions, leveraging a wide range of
              programming languages to boost user experiences and operational
              efficiencies across platforms. I have played a key role in
              bridging the gap between front-end design and back-end
              architecture, enhancing my full-stack technical prowess.
              <br />
              <br />
              As I continue to navigate the tech landscape, I&apos;m always on
              the lookout for new opportunities and collaborations that
              challenge and expand my skill set. Whether it&apos;s discussing
              potential job openings, exploring innovative tech projects, or
              simply exchanging ideas about the future of technology, please
              feel free to reach out!
            </p>
          </div>
          {/* Ensure the following content clears the float */}
          <div className="flex w-full mt-4">
            <div className="bg-gray-200 rounded-xl min-w-fit">
              <div className="flex justify-center">
                <div className="w-fit h-fit bg-gray-200 p-2 rounded-xl font-bold">
                  Education
                </div>
              </div>
              <p className="p-2 text-sm">
                <strong>University of Michigan</strong> - Ann Arbor, MI
                <br />
                <span className="italic">August 2019 - May 2023</span>
                <br />
                Bachelor of Science in Computer Science and Cognitive Science
                <br />
              </p>
            </div>
            <div className="flex-grow bg-gray-200 ml-4 rounded-xl">
              <div className="flex justify-center">
                <div className="w-fit h-fit bg-gray-200 p-2 rounded-xl font-bold">
                  Goals
                </div>
              </div>
              <p className="p-2 text-sm">
                I am keen on applying my diverse skills in software engineering,
                web development, cybersecurity, fintech, and tech consulting. My
                professional goal is to harness the power of computing and human
                cognition to develop innovative solutions that improve user
                experiences and business processes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
