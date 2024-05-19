import React from 'react';

interface EmbeddedYouTubeProps {
  url: string;
  className?: string;
}

const EmbeddedYouTube: React.FC<EmbeddedYouTubeProps> = ({
  url,
  className,
}) => {
  return (
    <iframe
      className={className}
      width="560"
      height="315"
      src={url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default EmbeddedYouTube;
