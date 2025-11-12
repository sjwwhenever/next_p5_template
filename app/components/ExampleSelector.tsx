'use client';

import { getAllExamples } from '../examples/registry';
import type { Example, BaseExampleParams } from '../examples/types';
import { ChevronDown } from 'lucide-react';

interface ExampleSelectorProps {
  selectedExample: Example<any>;
  onExampleChange: (example: Example<any>) => void;
}

export default function ExampleSelector({
  selectedExample,
  onExampleChange,
}: ExampleSelectorProps) {
  const examples = getAllExamples();

  return (
    <div className="space-y-2">
      <label className="text-xs text-gray-300 font-semibold">Select Example</label>
      <div className="relative">
        <select
          value={selectedExample.metadata.id}
          onChange={(e) => {
            const example = examples.find((ex) => ex.metadata.id === e.target.value);
            if (example) {
              onExampleChange(example);
            }
          }}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded appearance-none cursor-pointer hover:bg-gray-600 transition-colors pr-8"
        >
          {examples.map((example) => (
            <option key={example.metadata.id} value={example.metadata.id}>
              {example.metadata.name}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
          size={16}
        />
      </div>
      {selectedExample.metadata.description && (
        <p className="text-xs text-gray-400 italic">{selectedExample.metadata.description}</p>
      )}
    </div>
  );
}
