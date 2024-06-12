interface PageContainerProps {
  children: React.ReactNode;
  className?: string; // Optional className property
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = 'bg-white shadow-xl max-w-4xl',
}) => {
  return (
    <div className="flex justify-center items-center pt-20 px-4 pb-4">
      <div className={`${className} rounded-3xl overflow-hidden w-full`}>
        {children}
      </div>
    </div>
  );
};
