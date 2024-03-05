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
          <div className="relative rounded-xl bg-gray-200 overflow-hidden w-96 h-96 float-right ml-6 mb-4">
            <Image
              src="/images/james_portrait.png" // Replace with your photo path
              alt="Profile Photo"
              objectFit="cover"
              className="rounded-xl"
              fill
            />
          </div>
          {/* Text content */}
          <div className="flex justify-center">
            <div className="w-fit h-fit bg-gray-200 p-2 rounded-xl font-bold">
              Background
            </div>
          </div>
          <p className="pt-2 text-sm">
            I am a passionate Computer Science and Cognitive Science graduate
            from the University of Michigan. Armed with a robust Python, C++,
            and JavaScript skill set, I&apos;ve applied my programming acumen in
            diverse projects and roles. At Solidigm, I wrote and fixed Python
            tests within an extensive codebase to ensure SSD functionality.
            While at Intel, I specialized in firmware validation, adeptly
            working with continuous integration software and crafting efficient
            GUIs to boost performance. <br /> <br />
            In my academic projects, I&apos;ve utilized MongoDB, Flask, and many
            APIs to build applications, execute data transformations, and adopt
            algorithms for efficient processes. One such project was the
            &apos;TruBlu&apos; application, developed using Flask-Python, that
            revolutionized college tours by fostering direct connections between
            prospective and enrolled students with parallel interests in
            academic majors and extracurricular activities. <br /> <br />
            As a Cognitive Science major, I gained valuable insights into human
            cognition, enabling me to create user-friendly applications and
            solutions with an empathetic understanding of the user&apos;s
            perspective. This knowledge equips me to work efficiently in UX/UI
            design, Machine Learning, Artificial Intelligence, and more.
            <br />
            <br />I am keen on applying my diverse skills in software
            engineering, web development, cybersecurity, fintech, and tech
            consulting. My professional goal is to harness the power of
            computing and human cognition to develop innovative solutions that
            improve user experiences and business processes.
            <br /> <br /> Feel free to connect with me for software engineering,
            tech consulting, fintech, ML/AI, or web development opportunities.
          </p>
          {/* Ensure the following content clears the float */}
          <div className="clear-both">
            <div>
              <div className="flex justify-center">
                <div className="w-fit h-fit bg-gray-200 p-2 rounded-xl font-bold">
                  Education
                </div>
              </div>
              <p className="pt-2 text-sm">
                <strong>University of Michigan</strong> - Ann Arbor, MI
                <br />
                Bachelor of Science in Computer Science and Cognitive Science
                <br />
                <strong>Graduated:</strong> May 2021
              </p>
            </div>
            <div>
              <div className="flex justify-center">
                <div className="w-fit h-fit bg-gray-200 p-2 rounded-xl font-bold">
                  Goals
                </div>
              </div>
              <p className="pt-2 text-sm">
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
