// AppearInComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const growFromCenterAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const AnimatedDiv = styled.div<{ delay: number; isVisible: boolean }>`
  opacity: 0;
  transform-origin: center;
  ${({ isVisible, delay }) =>
    isVisible &&
    css`
      animation: ${growFromCenterAnimation} 0.75s ease-out forwards;
      animation-delay: ${delay}s;
    `}
`;

type AppearInComponentProps = {
  delay: number;
  children: React.ReactNode;
};

const AppearInComponent: React.FC<AppearInComponentProps> = ({
  delay,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      {
        threshold: 0.8, // Adjust according to when you want the animation to start
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <AnimatedDiv ref={ref} delay={delay} isVisible={isVisible}>
      {children}
    </AnimatedDiv>
  );
};

export default AppearInComponent;
