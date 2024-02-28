import { ExperienceProps } from './../experienceProps';
import experienceData from './../../experience/experiences.json';

export default function ExperiencePage({
  params,
}: {
  params: ExperienceProps;
}) {
  return <div className="pt-20">My Post: {params.title}</div>;
}

export async function generateStaticParams() {
  const paths = experienceData;

  return paths.map((experience: ExperienceProps) => ({
    params: experience,
  }));
}
