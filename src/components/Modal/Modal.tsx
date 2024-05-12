import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute bg-gray-500 bg-opacity-50 inset-0"></div>
      <div className="z-10 w-3/4 max-w-lg mx-auto bg-white rounded-lg p-4">
        <header className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </header>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
