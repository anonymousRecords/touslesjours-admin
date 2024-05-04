import { ReactNode } from 'react';

interface AccordianProps {
  title: string;
  children: ReactNode;
  isAccordianOpen: boolean;
  onClick: () => void;
}

export default function Accordian({ title, children, isAccordianOpen, onClick }: AccordianProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClick}>
          {isAccordianOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      </div>
      {isAccordianOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
}
