'use client';

import { useState, ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  toggle?: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  };
}

export default function CollapsibleSection({
  title,
  icon,
  children,
  defaultExpanded = true,
  toggle
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="overflow-hidden">
      <div className="w-full px-3 py-2 bg-gray-900 text-white hover:bg-black flex items-center justify-between transition-colors border-b border-gray-700">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 flex-1 text-left"
        >
          <span className="text-white">{icon}</span>
          <span className="text-sm font-medium text-white">{title}</span>
        </button>

        <div className="flex items-center gap-2">
          {toggle && (
            <input
              type="checkbox"
              checked={toggle.checked}
              onChange={(e) => {
                e.stopPropagation();
                toggle.onChange(e.target.checked);
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 text-white bg-gray-800 border-gray-600 rounded focus:ring-white"
            />
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white transition-transform duration-200"
          >
            <span className={isExpanded ? 'rotate-180 inline-block' : 'inline-block'}>
              ▼
            </span>
          </button>
        </div>
      </div>

      <div className={`transition-all duration-200 ease-in-out ${
        isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="p-3 space-y-3 bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}
