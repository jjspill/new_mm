export interface ExperienceProps {
  title: string;
  description: string;
  long_text: string;
  key_features?: string[][];
  youtube_video?: string;
  technologies?: string[];
  documents?: { title: string; path: string }[];
  link?: string;
  company?: string;
}
