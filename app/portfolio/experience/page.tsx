'use client';

import React, { useState, useEffect, useRef } from 'react';
import experienceData from './experiences.json';
import styles from './Experience.module.css';

interface ExperienceProps {
  title: string;
  description: string;
  link?: string;
}

const Experience: React.FC<ExperienceProps> = (experience) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(0); // Initial scale state
  const elementRef = useRef<HTMLDivElement>(null);

  // Generate random style not on mount but before render
  const initialStyles = useRef(generateRandomStyle()).current;

  useEffect(() => {
    // Apply initial random style immediately
    if (elementRef.current) {
      for (const [key, value] of Object.entries(initialStyles)) {
        elementRef.current.style[key as any] = value;
      }
    }

    // Animation for scaling up from 0 to 1 over 2 seconds
    const scaleDuration = 2000; // 2 seconds for scale animation
    let startTime: number | null = null;

    const animateScale = (time: number) => {
      if (!startTime) startTime = time;
      const elapsedTime = time - startTime;
      const fraction = Math.min(elapsedTime / scaleDuration, 1);

      setScale(0.1 + fraction * (1 - 0.1)); // Scale from 0.1 to 1

      if (fraction < 1) {
        requestAnimationFrame(animateScale);
      }
    };

    requestAnimationFrame(animateScale);

    // Event listener for mouse movement to adjust rotation
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

    // Cleanup function
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Apply dynamic scale and rotation continuously
    if (elementRef.current) {
      elementRef.current.style.transform = `scale(${scale}) perspective(5000px) rotateY(${rotateX}deg) rotateX(${rotateY}deg)`;
    }
  }, [rotateX, rotateY, scale]);

  return (
    <div
      ref={elementRef}
      className="text-3xl font-bold text-[var(--undefined)] bg-white p-8 rounded-lg absolute"
      tabIndex={0}
    >
      <p>{experience.title}</p>
      <div>{experience.description}</div>
      {experience.link && (
        <a href={experience.link} target="_blank" rel="noopener noreferrer">
          Learn More
        </a>
      )}
    </div>
  );
};

// Presumed existing function
const generateRandomStyle = (): React.CSSProperties => ({
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`,
  position: 'absolute',
});

const Experiences: React.FC = () => {
  const experiences: ExperienceProps[] = experienceData;

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden bg-[hsl(224,32%,12%)] bg-[conic-gradient(from_0deg_at_50%_50%,blue,purple,purple,blue)] bg-blend-multiply">
      {experiences.map((experience, index) => (
        <Experience key={index} {...experience} />
      ))}
    </div>
  );
};

export default Experiences;

// import React, { useState } from 'react';
// import styles from './Experience.module.css';

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   link?: string;
// }

// const sampleProjects: Project[] = [
//   {
//     id: 1,
//     title: 'Project Alpha',
//     description: 'An innovative platform for social media analytics.',
//     link: 'https://example.com/project-alpha',
//   },
//   {
//     id: 2,
//     title: 'Beta App',
//     description: 'A mobile app that simplifies grocery shopping with AI.',
//     link: 'https://example.com/beta-app',
//   },
//   {
//     id: 3,
//     title: 'Gamma Solution',
//     description:
//       'A cloud-based solution for managing remote teams efficiently.',
//     link: 'https://example.com/gamma-solution',
//   },
//   // Add more projects as needed
// ];

// const generateRandomStyle = (): React.CSSProperties => ({
//   top: `${Math.random() * 80 + 10}%`,
//   left: `${Math.random() * 80 + 10}%`,
//   animation: `${styles.appear} ${
//     Math.random() * 5 + 2
//   }s ease-in-out forwards` as React.CSSProperties['animation'],
//   position: 'absolute' as 'absolute',
// });

// function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   wait: number
// ): T {
//   let timeout: ReturnType<typeof setTimeout> | null = null;
//   return function (...args: Parameters<T>) {
//     const later = () => {
//       timeout = null;
//       func(...args);
//     };
//     if (timeout !== null) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(later, wait);
//   } as T;
// }

// const Experience: React.FC = () => {
//   const [divs, setDivs] = useState<Project[]>(() =>
//     sampleProjects.map((project) => ({
//       ...project,
//       style: generateRandomStyle(),
//     }))
//   );

//   // Debounced version of the function that moves divs
//   const handleMouseMoveDebounced = debounce(
//     (mouseX: number, mouseY: number) => {
//       const newDivs = divs.map((div) => {
//         const divX = parseFloat(div.style.left);
//         const divY = parseFloat(div.style.top);
//         const deltaX = mouseX > divX ? 10 : -10;
//         const deltaY = mouseY > divY ? 10 : -10;

//         // Apply bounds checking
//         const newLeft = Math.max(0, Math.min(100, divX + deltaX));
//         const newTop = Math.max(0, Math.min(100, divY + deltaY));

//         return {
//           ...div,
//           style: {
//             ...div.style,
//             left: `${newLeft}%`,
//             top: `${newTop}%`,
//           },
//         };
//       });

//       setDivs(newDivs);
//     },
//     50
//   ); // Adjust debounce time as needed

//   // Event listener for mouse movement
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left; // mouse position relative to the div container
//     const mouseY = e.clientY - rect.top;

//     handleMouseMoveDebounced(mouseX, mouseY);
//   };

//   return (
//     <div
//       className="relative w-full h-screen overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       {divs.map((div) => (
//         <div key={div.id} style={div.style} className={styles.projectDiv}>
//           <h3>{div.title}</h3>
//           <p>{div.description}</p>
//           {div.link && (
//             <a href={div.link} target="_blank" rel="noopener noreferrer">
//               Learn More
//             </a>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Experience;
