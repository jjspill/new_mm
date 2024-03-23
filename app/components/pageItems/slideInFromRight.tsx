// SlideInFromRightComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const slideInFromRightAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimatedDiv = styled.div<{ delay: number; isVisible: boolean }>`
  opacity: 0;
  ${({ isVisible, delay }) =>
    isVisible &&
    css`
      animation: ${slideInFromRightAnimation} 0.75s ease-out forwards;
      animation-delay: ${delay}s;
    `}
`;

type SlideInFromRightComponentProps = {
  delay: number;
  children: React.ReactNode;
};

const SlideInFromRightComponent: React.FC<SlideInFromRightComponentProps> = ({
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
        threshold: 0.1,
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

export default SlideInFromRightComponent;
