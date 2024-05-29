export const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex justify-center items-center pt-20 px-4 pb-4">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
};
