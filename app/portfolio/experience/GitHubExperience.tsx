import Image from 'next/image';
import Link from 'next/link';
import styles from './experience.module.css'; // Assuming you have similar CSS for GitHub

interface GitHubExperienceProps {
  profileUrl: string;
  title: string;
  description: string;
}

export const GitHubExperience: React.FC<GitHubExperienceProps> = ({
  profileUrl,
  title,
  description,
}) => {
  return (
    <div className="shadow-lg rounded-2xl text-center">
      <div className="flex items-center justify-center py-1 px-6 bg-gray-200 h-fit w-full">
        <GitHubSVG />
      </div>
      <div className="px-4 py-2 flex flex-col items-center">
        <p className="text-sm pt-1">{description}</p>
        <Link href={profileUrl} target="_blank">
          <div
            className={`${styles.creepInBg} border border-[#333] mt-2 p-2 rounded-full w-fit text-xs text-[#333]`}
          >
            View Profile
          </div>
        </Link>
      </div>
    </div>
  );
};

export const GitHubRecPage: React.FC<GitHubExperienceProps> = ({
  profileUrl,
  description,
}) => {
  return (
    <div className="shadow-lg rounded-2xl text-center my-2 bg-gray-100">
      <div className="flex items-center justify-center py-1 px-6 bg-gray-200 h-fit min-h-10 w-full rounded-t-2xl md:justify-center md:space-x-4">
        <GitHubSVG />
      </div>
      <div className="px-4 py-2 pb-4 flex flex-col items-center">
        <p className="pt-1">{description}</p>
        <Link href={profileUrl} target="_blank">
          <div
            className={`${styles.creepInBg} border border-black mt-2 p-2 rounded-full w-fit text-xs text-black`}
          >
            View Profile
          </div>
        </Link>
      </div>
    </div>
  );
};

const GitHubSVG = () => {
  return (
    <svg
      height="32"
      viewBox="0 0 16 16"
      version="1.1"
      width="32"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      ></path>
    </svg>
  );
};
