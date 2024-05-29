interface SubmitButtonProps {
  label: string;
  type: 'button' | 'submit' | 'reset';
}

export const SubmitButton = ({ type, label }: SubmitButtonProps) => {
  return (
    <div className="mt-6">
      <button
        type={type}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-300"
      >
        {label}
      </button>
    </div>
  );
};
