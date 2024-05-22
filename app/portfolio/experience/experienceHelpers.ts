import { getAPIUrl } from 'config/config';

export interface ExperienceProps {
  title: string;
  description: string;
  long_text: string;
  key_features: {
    feature: string;
    description: string;
  }[];
  youtube_video: string;
  technologies: string[];
  documents: {
    title: string;
    path: string;
  }[];
  link: string;
}

const apiURL = getAPIUrl();

export async function getAllExperiences(): Promise<ExperienceProps[]> {
  const res = await fetch(
    // 'https://preview.api.james-spillmann.com/experiences',
    `${apiURL}/experiences`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    },
  );

  const experienceData = await res.json();

  if (!experienceData?.data) {
    console.error('Unable to all fetch data from the API.');
  }

  return experienceData?.data;
}

export async function getExperience(slug: string): Promise<ExperienceProps> {
  const res = await fetch(
    // `https://preview.api.james-spillmann.com/experiences/${slug}`,
    `${apiURL}/experiences/${slug}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    },
  );

  const experienceData = await res.json();

  if (!experienceData?.data) {
    console.error('Unable to fetch data from the API.');
  }

  return experienceData?.data;
}
