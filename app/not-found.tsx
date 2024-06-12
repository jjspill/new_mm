import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {/* <svg
          className="mx-auto mb-4 w-24 h-24 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 19h5.656M12 15v4m-8 0a8 8 0 108 8V4H8v15a4 4 0 01-4 4zm8 0a4 4 0 100-8 4 4 0 000 8zm0 5a8 8 0 008-8V4l-.867.867A8.972 8.972 0 0112 3a8.972 8.972 0 01-6.133 1.867L5 4v12a8 8 0 008 8z"
          />
        </svg> */}
        <svg
          height="300"
          viewBox="0 0 297.5 297.5"
          width="800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m277.19 51.82v69.59h-69.6z" fill="#0b77a5" />
          <path
            d="m176.45 37.63-83.78 83.78h-58.16l83.78-83.78z"
            fill="#0b77a5"
          />
          <path d="m89.91 37.63-69.59 69.59v-69.59z" fill="#fcbf31" />
          <path d="m263 37.63-83.79 83.78h-58.16l83.78-83.78z" fill="#fcbf31" />
          <path d="m297.25 27.59v103.85c0 5.54-4.49 10.04-10.03 10.04h-24.58v118.39h7.27c5.54 0 10.03 4.5 10.03 10.04s-4.49 10.03-10.03 10.03h-34.62c-5.54 0-10.03-4.49-10.03-10.03s4.49-10.04 10.03-10.04h7.28v-118.39h-187.63v118.39h7.27c5.54 0 10.04 4.5 10.04 10.04s-4.5 10.03-10.04 10.03h-34.61c-5.55 0-10.04-4.49-10.04-10.03s4.49-10.04 10.04-10.04h7.27v-118.39h-24.58c-5.54 0-10.04-4.5-10.04-10.04v-103.85c0-5.54 4.5-10.03 10.04-10.03h276.93c5.54-0 10.03 4.49 10.03 10.03zm-20.06 93.82v-69.59l-69.6 69.59zm-97.98 0 83.79-83.78h-58.17l-83.78 83.78zm-86.54 0 83.78-83.78h-58.16l-83.78 83.78zm-72.35-14.19 69.59-69.59h-69.59z" />
        </svg>
        <h2 className="text-2xl font-semibold text-white pt-10">
          Still working on this, check back later!
        </h2>
      </div>
    </div>
  );
}
