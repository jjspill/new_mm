interface PDFViewerProps {
  pdfFiles: { title: string; path: string }[];
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFiles }) => {
  return (
    <div className="overflow-hidden">
      <div className="flex overflow-x-auto p-4">
        <div className="flex flex-row space-x-4 min-w-full">
          {pdfFiles.map((file, index) => (
            <div
              key={index}
              className="flex-none h-fit bg-gray-200 p-5 m-1 rounded-lg shadow-lg"
              style={{ width: '274px' }}
            >
              <iframe
                src={`${file.path}#toolbar=0&navpanes=0&scrollbar=0`}
                title={file.title}
                className="w-[234px] h-[301px]"
              ></iframe>
              <h3 className="text-center text-lg text-gray-800 mt-2">
                {file.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
