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
    <div className="flex justify-center items-center pt-20 px-4 ">
      {experience && (
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-4xl">
          <div className="bg-gray-200 text-center py-12">
            <h1 className="text-4xl font-bold text-gray-800">
              {experience.title}
            </h1>
            <p className="text-md text-gray-600 mt-4 px-6">
              {experience.description}
            </p>
          </div>

          <div className="p-8">
            <p className="text-gray-700 text-lg whitespace-pre-line">
              {experience.long_text}
            </p>
          </div>

          {experience && (
            <div className="bg-gray-200 px-8 h-16 max-h-full max-w-full hover:bg-gray-300">
              <a
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                {/* eslint-disable-line */}
                <div className="flex justify-center items-center py-3">
                  <Image
                    src="/images/github_mark.png"
                    alt="GitHub Logo"
                    width={40}
                    height={40}
                  />
                </div>
              </a>
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
