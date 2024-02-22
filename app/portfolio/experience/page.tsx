'use client';

import React, { useState, useEffect } from 'react';

const PreContainer: React.FC = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useEffect(() => {
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

  const dynamicStyles: Record<string, string> = {
    '--rotateX': `${rotateX}deg`,
    '--rotateY': `${rotateY}deg`,
    '--selector': 'hsl(338, 70%, 55%)', // Assuming you define these colors in your CSS or :root
    '--property': 'hsl(183, 70%, 62%)',
    '--punctuation': 'hsl(334, 7%, 95%)',
    '--undefined': 'hsl(334, 7%, 95%)',
    transform: `perspective(5000px) rotateY(${rotateX}deg) rotateX(${rotateY}deg)`, // Direct transformation
    transformStyle: 'preserve-3d',
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden bg-[hsl(224,32%,12%)] bg-[conic-gradient(from_0deg_at_50%_50%,blue,purple,purple,blue)] bg-blend-multiply">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="w-full h-32 bg-black opacity-50"></div>
        ))}
      </div>
      <pre
        contentEditable
        className="language-css text-3xl font-bold text-[var(--undefined)] bg-[hsl(222,45%,7%)] p-8 rounded-lg absolute"
        style={dynamicStyles as React.CSSProperties} // Cast as React.CSSProperties to bypass type checking
        tabIndex={0}
      >
        <code>
          .awesome-layouts {'{'}
          <br />
          &nbsp;&nbsp;display: grid;
          <br />
          {'}'}
        </code>
      </pre>
      <a
        href="https://youtu.be/Z-3tPXf9a7M"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 text-gray-400"
      >
        YouTube tutorial on making this here
      </a>
    </div>
  );
};

export default PreContainer;

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
