import { MetadataRoute } from 'next';
import {
  ExperienceProps,
  getAllExperiences,
} from './portfolio/experience/experienceHelpers';

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  const experiences = await getAllExperiences();
  const experienceTitles = experiences?.map(
    (experience: ExperienceProps) => experience.title,
  );
  const experiencePages = experienceTitles?.map((title: string) => ({
    url: `${domain}/portfolio/experience/${title}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as any,
    priority: 1,
  }));

  const staticPages = [
    {
      url: `${domain}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${domain}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${domain}/experience`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${domain}/portfolio/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${domain}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  return [...staticPages, ...(experiencePages ? experiencePages : [])];
}

export default sitemap;
