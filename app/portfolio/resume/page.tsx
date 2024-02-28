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
    </div>
  );
};

export default App;
