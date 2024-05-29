interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required_prop?: boolean;
}

export const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  required_prop,
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="mt-2 block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
      required={required_prop}
    />
  </div>
);
