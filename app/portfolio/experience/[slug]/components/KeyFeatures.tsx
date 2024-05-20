import React from 'react';

// Define the component props
interface FeaturesProps {
  keyFeatures: string[][];
  company?: string;
}

// The component
const KeyFeatures: React.FC<FeaturesProps> = ({ keyFeatures, company }) => {
  return (
    <div className="px-4 pt-8">
      <div className="flex justify-center">
        {company ? (
          <h2 className="text-3xl text-gray-800 font-semibold pb-5">
            Contributions
          </h2>
        ) : (
          <h2 className="text-3xl text-gray-800 font-semibold pb-5">
            Key Features
          </h2>
        )}
      </div>
      {keyFeatures.map((feature, index) => (
        <div
          key={index}
          className="mb-4 border-l-4 border-gray-400 bg-gray-200 p-5 rounded-lg"
        >
          <h3 className="text-gray-800 text-lg font-semibold">{feature[0]}</h3>{' '}
          <p className="text-gray-600 mt-2">{feature[1]}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyFeatures;
