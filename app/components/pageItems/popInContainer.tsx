// PopInComponent.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const popInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(500%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedDiv = styled.div<{ delay: number }>`
  animation: ${popInAnimation} 0.75s ease-out forwards;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0;
`;

type PopInComponentProps = {
  delay: number;
  children: React.ReactNode;
};

const PopInComponent: React.FC<PopInComponentProps> = ({ delay, children }) => {
  return <AnimatedDiv delay={delay}>{children}</AnimatedDiv>;
};

export default PopInComponent;
