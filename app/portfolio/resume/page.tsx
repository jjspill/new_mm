import React from 'react';

const App: React.FC = () => {
  const pdfFile = '/pdf/resume.pdf';

  return (
    <div className="pt-20">
      <div className="flex justify-center p-4 h-screen m-4 rounded-2xl">
        <iframe
          src={pdfFile}
          className="w-[900px] h-full border-0 pb-8"
          title="PDF Viewer"
        />
      </div>
      q
      <p className="text-center text-sm">
        If you&apos;re having trouble viewing the PDF, you can{' '}
        <a
          href={pdfFile}
          className="text-blue-500 hover:text-blue-800"
          download
        >
          download it here
        </a>
        .
      </p>
    </div>
  );
};

export default App;
