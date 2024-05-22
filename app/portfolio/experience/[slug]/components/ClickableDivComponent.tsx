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
  const handleOpenPdf = () => {
    const byteCharacters = atob(path); // Decode base64
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  };

  return (
    <div className={`cursor-pointer ${className}`} onClick={handleOpenPdf}>
      {children}
    </div>
  );
};

export default ClickableDiv;
