import { MetadataRoute } from 'next';
import {
  ExperienceProps,
  getAllExperiences,
} from './portfolio/experience/experienceHelpers';

export default function sitemap({
  params,
}: {
  params: any;
}): MetadataRoute.Sitemap {
  const domain = 'https://james-spillmann.com';

  const experiencePages = params.map((param: any) => ({
    url: `${domain}/portfolio/experience/${param.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
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

  return [...experiencePages, ...staticPages];
}

export async function generateStaticParams() {
  const experiences = await getAllExperiences();

  return experiences.map((experience: ExperienceProps) => ({
    slug: experience.title,
  }));
}
