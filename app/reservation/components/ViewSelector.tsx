'use client';
import React from 'react';

type ViewSelectorProps = {
  currentView: 'calendar' | 'list';
  onViewChange: (view: 'calendar' | 'list') => void;
};

function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
            currentView === 'calendar'
              ? 'bg-green-200 text-green-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } border border-gray-200`}
          onClick={() => onViewChange('calendar')}
        >
          달력 뷰
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
            currentView === 'list'
              ? 'bg-green-200 text-green-800'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } border border-gray-200`}
          onClick={() => onViewChange('list')}
        >
          리스트 뷰
        </button>
      </div>
    </div>
  );
}

export default ViewSelector;
