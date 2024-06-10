import { getAPIUrl } from 'config/config';

export interface ExperienceProps {
  id: string;
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
  priority: number;
}

const apiURL = getAPIUrl();

export async function getAllExperiences(): Promise<ExperienceProps[]> {
  const res = await fetch(
    // 'https://preview.api.james-spillmann.com/experiences',
    `${apiURL}/experiences`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      next: { revalidate: 300 },
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
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
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

export function shuffleArray<T>(array: T[]): T[] {
  let shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
export interface Position {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

// measure and store positions
export const measureAndStorePosition = (
  index: number,
  element: HTMLDivElement | null,
  positionsRef: React.MutableRefObject<{ [key: number]: Position }>,
): void => {
  if (element) {
    const rect = element.getBoundingClientRect();
    positionsRef.current[index] = {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
    };
  }
};

// check for a overlap
export const checkForFirstOverlap = (
  positionsRef: React.MutableRefObject<{ [key: number]: Position }>,
  setMessageShown: React.Dispatch<React.SetStateAction<boolean>>,
  localStorageKey: string,
): void => {
  const positions = positionsRef.current;
  const keys = Object.keys(positions);
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const rect1 = positions[parseInt(keys[i])];
      const rect2 = positions[parseInt(keys[j])];
      if (rect1 && rect2 && doOverlap(rect1, rect2)) {
        if (!localStorage.getItem(localStorageKey)) {
          // localStorage.setItem(localStorageKey, 'true');
          setMessageShown(true);
        }
        return;
      }
    }
  }
};

// determine if two tiles overlap
export const doOverlap = (rect1: Position, rect2: Position): boolean => {
  return !(
    rect2.left > rect1.right ||
    rect2.right < rect1.left ||
    rect2.top > rect1.bottom ||
    rect2.bottom < rect1.top
  );
};
