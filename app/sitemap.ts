import { MetadataRoute } from 'next';
import {
  ExperienceProps,
  getAllExperiences,
} from './portfolio/experience/experienceHelpers';

interface SitemapParams {
  titles: string[];
}

export default function sitemap({
  params,
}: {
  params: SitemapParams;
}): MetadataRoute.Sitemap {
  const domain = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  const experiencePages = params.titles.map((param: any) => ({
    url: `${domain}/portfolio/experience/${param.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as any,
    priority: 0.8,
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
      priority: 0.5,
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
      priority: 0.5,
    },
    {
      url: `${domain}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  return [...staticPages, ...experiencePages];
}

export async function generateStaticParams() {
  const experiences = await getAllExperiences();

  const experienceTitles = experiences.map(
    (experience: ExperienceProps) => experience.title,
  );

  return { titles: experienceTitles };
}
