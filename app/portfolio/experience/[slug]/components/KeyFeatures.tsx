import React from 'react';

// Define the component props
interface FeaturesProps {
  keyFeatures: {
    feature: string;
    description: string;
  }[];
  title?: string;
}

// The component
const KeyFeatures: React.FC<FeaturesProps> = ({ keyFeatures, title }) => {
  const company =
    title === 'Intel' || title === 'Solidigm' || title === 'Solidigm';

  return (
    <div className="px-4">
      <div className="flex justify-center">
        {company ? (
          <h2 className="pb-10 text-3xl text-gray-800 font-semibold">
            Contributions
          </h2>
        ) : (
          <h2 className="pb-10 text-3xl text-gray-800 font-semibold">
            Key Features
          </h2>
        )}
      </div>
      {keyFeatures.map((feature, index) => (
        <div
          key={index}
          className="mb-4 border-l-4 border-gray-400 bg-gray-200 p-5 rounded-lg"
        >
          <h3 className="text-gray-800 text-lg font-semibold">
            {feature.feature}
          </h3>
          <p className="text-gray-600 mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyFeatures;
