interface PageContainerProps {
  children: React.ReactNode;
  className?: string; // Optional className property
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '', // Default to an empty string if not provided
}) => {
  return (
    <div className="flex justify-center items-center pt-20 px-4 pb-4">
      <div
        className={`bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-4xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
