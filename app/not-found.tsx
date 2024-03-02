import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <svg
          className="mx-auto mb-4 w-24 h-24 text-gray-400"
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
        </svg>
        <h2 className="text-2xl font-semibold text-gray-900">
          Still Working on This!
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          We&apos;re still working on this page. Check back later!
        </p>
      </div>
    </div>
  );
}
