import { createContext, useContext } from 'react';
import { ExperienceProps } from '../portfolio/experience/experienceHelpers';

const ExperienceContext = createContext<ExperienceProps[]>([]);

export const useExperienceContext = () => useContext(ExperienceContext);
export const ExperienceProvider = ExperienceContext.Provider;
