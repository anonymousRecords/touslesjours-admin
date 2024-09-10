type FormLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

export function FormLabel({ htmlFor, children }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="block mb-1 font-medium">
      {children}
    </label>
  );
}
