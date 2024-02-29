import { ExperienceProps } from './../experienceProps';
import experienceData from './../../experience/experiences.json';
import Image from 'next/image';

const getExperienceByTitle = (title: string) => {
  return experienceData.find((experience) => experience.title === title);
};

export default function ExperiencePage({
  params,
}: {
  params: { slug: string };
}) {
  const experience = getExperienceByTitle(decodeURIComponent(params.slug));
  return (
    <div className="flex justify-center items-center pt-20 px-4 min-h-screen">
      {experience && (
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-4xl">
          {/* Header or Hero Section */}
          <div className="bg-gray-200 text-center py-12">
            <h1 className="text-4xl font-bold text-gray-800">
              {experience.title}
            </h1>
            <p className="text-md text-gray-600 mt-4 px-6">
              {experience.description}
            </p>
          </div>

          {/* Detailed Text Section */}
          <div className="p-8">
            <p className="text-gray-700 text-lg whitespace-pre-line">
              {experience.long_text}
            </p>
          </div>

          {/* Call to Action or Link */}
          {experience && (
            <div className="bg-gray-200 px-8 py-4 h-20">
              <Image
                src="/images/github_mark.png"
                alt="GitHub Logo"
                width={80}
                height={80}
                layout="responsive"
                style={{ borderRadius: '50%' }} // Optional: if you want a circular mask
              />
              {/* <a
                href={experience.link}
                className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const paths = experienceData;

  return paths.map((experience: ExperienceProps) => ({
    experience: experience,
  }));
}
