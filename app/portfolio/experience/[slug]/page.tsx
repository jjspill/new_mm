import {
  ExperienceProps,
  getAllExperiences,
  getExperience,
} from '../experienceHelpers';
import Image from 'next/image';
import EmbeddedYouTube from './components/EmbeddedYoutube';
import KeyFeatures from './components/KeyFeatures';
import PDFViewer from './components/PDFViewer';

export default async function ExperiencePage({ params }: { params: any }) {
  const experience = await getExperience(params.slug);
  return (
    <div className="flex justify-center items-center pt-20 px-4 pb-4 ">
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

          <div className="py-8 mx-4">
            <p className=" text-center text-gray-700 text-lg">
              {experience.long_text}
            </p>
          </div>

          {experience.youtube_video && (
            <div className="flex justify-center items-center">
              <EmbeddedYouTube
                className="w-[80%] rounded-xl border-8 border-gray-200"
                url={experience.youtube_video}
              />
            </div>
          )}

          {experience.key_features && (
            <KeyFeatures
              keyFeatures={experience.key_features}
              title={experience.title}
            />
          )}

          {experience.technologies && (
            <div className="flex flex-wrap justify-center items-center p-4">
              {experience.technologies.map((technology) => (
                <div
                  key={technology}
                  className="bg-gray-200 px-4 py-2 m-2 rounded-full text-center text-gray-800"
                >
                  {technology}
                </div>
              ))}
            </div>
          )}

          {experience.documents.length >= 1 && (
            <PDFViewer experienceTitle={experience.title} />
          )}

          {experience.link && (
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
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
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
  const experiences = await getAllExperiences().then((experiences) => {
    return experiences.filter(
      (experience) =>
        experience.id !== 'LinkedIn' && experience.id !== 'GitHub',
    );
  });

  if (!experiences) {
    return [];
  }

  return experiences?.map((experience: ExperienceProps) => ({
    slug: experience.title,
  }));
}
