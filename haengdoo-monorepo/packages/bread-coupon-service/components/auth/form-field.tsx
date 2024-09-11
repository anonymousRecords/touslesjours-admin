type FormFieldProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

export const FormField: React.FC<FormFieldProps> = ({ label, error, ...inputProps }) => (
  <div className="mb-4">
    <label htmlFor={inputProps.name} className="block mb-1 font-medium">
      {label}
    </label>
    <input
      {...inputProps}
      className={`w-full p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);
