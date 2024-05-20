'use client';

import React from 'react';

interface ClickableDivProps {
  children?: React.ReactNode;
  className?: string;
  path: string;
}

const ClickableDiv: React.FC<ClickableDivProps> = ({
  children,
  path,
  className,
}) => {
  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={() => window.open(path, '_blank', 'noopener noreferrer')}
    >
      {children}
    </div>
  );
};

export default ClickableDiv;
