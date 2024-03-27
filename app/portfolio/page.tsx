import Image from "next/legacy/image";
import Link from 'next/link';

export default function portfolio() {
  const commonSpanClasses = 'text-sm flex items-center';
  return (
    <div className="flex justify-center items-start pt-20 px-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl mb-4 h-fit">
        <Image
          src="/images/grad_stadium_small.png"
          alt="Friends"
          width={1200}
          height={900}
        />
        <div className="px-2">
          <div className="flex flex-col justify-center text-center bg-gray-200 hover:bg-gray-300 shadow-lg rounded-2xl py-4 px-2 my-4">
            <Link href="/portfolio/about">
              <div className="text-xl font-normal pb-1">
                <span className="font-semibold">About</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex-1 flex justify-end pr-4">
                  <span className={commonSpanClasses}>Background</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="h-5 w-px bg-black"></div>
                </div>
                <div className="px-4">
                  <span className={commonSpanClasses}>Education</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="h-5 w-px bg-black"></div>
                </div>
                <div className="flex-1 flex justify-start pl-4">
                  <span className={commonSpanClasses}>Goals</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col justify-center text-center bg-gray-200 hover:bg-gray-300 shadow-lg rounded-2xl py-4 px-2 my-4">
            <Link href="/portfolio/experience">
              <div className="text-xl font-normal pb-1">
                <span className="font-semibold">Experience</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm pr-4">Personal Projects</span>
                <div className="h-5 w-px bg-black"></div>
                <span className="text-sm pl-4">Professional Work</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link href="/portfolio/resume">
              <div className="flex justify-center bg-gray-200 hover:bg-gray-300 shadow-lg rounded-2xl py-4 px-2 my-4">
                <div className="text-xl font-normal">
                  <span className="font-semibold">Resume</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="md:hidden">
            <a
              href="/pdf/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center bg-gray-200 hover:bg-gray-300 shadow-lg rounded-2xl py-4 px-2 my-4"
            >
              <div className="text-xl font-normal">
                <span className="font-semibold">Resume</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
