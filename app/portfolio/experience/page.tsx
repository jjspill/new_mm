import React, { useEffect, useState } from 'react';
import { ExperienceProps, getAllExperiences } from './experienceHelpers';
import ExperiencesContainer, { Experiences } from './ExperienceClient';

export default async function Page() {
  const experiences = await getAllExperiences();

  return (
    <ExperiencesContainer>
      <Experiences experiences={experiences} />
    </ExperiencesContainer>
  );
}
