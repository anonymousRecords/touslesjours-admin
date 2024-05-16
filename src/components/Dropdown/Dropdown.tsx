import { useState } from 'react';

interface DropdownProps {
  buttonContent: React.ReactNode;
  dropdownContent: string[];
  onSelect: (content) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonContent,
  dropdownContent,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedContent, setSelectedContent] = useState<string>();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleContentSelect = (index) => {
    toggleDropdown();
    onSelect(index);
    setIsOpen(!isOpen);
    // setSelectedContent(dropdownContent[index]);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
      >
        <div>{buttonContent}</div>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {dropdownContent.map((content, index) => (
              <button
                key={index}
                onClick={() => handleContentSelect(index)}
                className="block  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                {content}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
