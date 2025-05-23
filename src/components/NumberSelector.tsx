
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NumberSelectorProps {
  onNumbersSelected: (numbers: number[]) => void;
  maxNumbers: number;
  maxValue: number;
}

const NumberSelector = ({ onNumbersSelected, maxNumbers, maxValue }: NumberSelectorProps) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      const newNumbers = selectedNumbers.filter(n => n !== number);
      setSelectedNumbers(newNumbers);
      onNumbersSelected(newNumbers);
    } else if (selectedNumbers.length < maxNumbers) {
      const newNumbers = [...selectedNumbers, number].sort((a, b) => a - b);
      setSelectedNumbers(newNumbers);
      onNumbersSelected(newNumbers);
    }
  };

  const randomSelect = () => {
    const numbers: number[] = [];
    while (numbers.length < maxNumbers) {
      const num = Math.floor(Math.random() * maxValue) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    numbers.sort((a, b) => a - b);
    setSelectedNumbers(numbers);
    onNumbersSelected(numbers);
  };

  const clearSelection = () => {
    setSelectedNumbers([]);
    onNumbersSelected([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          Select {maxNumbers} numbers (1-{maxValue})
        </h3>
        <div className="space-x-2">
          <Button onClick={randomSelect} variant="outline" size="sm">
            Quick Pick
          </Button>
          <Button onClick={clearSelection} variant="outline" size="sm">
            Clear
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-gray-300 mb-2">
        Selected: {selectedNumbers.length}/{maxNumbers}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: maxValue }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => toggleNumber(number)}
            className={`
              w-10 h-10 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105
              ${selectedNumbers.includes(number)
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
              }
            `}
          >
            {number}
          </button>
        ))}
      </div>
      
      {selectedNumbers.length > 0 && (
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-white font-semibold">Your numbers:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedNumbers.map((number) => (
              <span
                key={number}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                {number}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberSelector;
