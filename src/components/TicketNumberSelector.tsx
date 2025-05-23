
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TicketNumberSelectorProps {
  maxNumbers: number;
  totalNumbers: number;
  onSelectionChange: (numbers: number[]) => void;
  selectedNumbers: number[];
}

const TicketNumberSelector = ({ 
  maxNumbers, 
  totalNumbers, 
  onSelectionChange, 
  selectedNumbers 
}: TicketNumberSelectorProps) => {
  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      onSelectionChange(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < maxNumbers) {
      onSelectionChange([...selectedNumbers, num]);
    }
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const quickPick = () => {
    const numbers = [];
    while (numbers.length < maxNumbers) {
      const num = Math.floor(Math.random() * totalNumbers) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    onSelectionChange(numbers.sort((a, b) => a - b));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-semibold">
          Pick {maxNumbers} numbers (1-{totalNumbers})
        </h3>
        <div className="text-green-400 font-medium">
          {selectedNumbers.length}/{maxNumbers} selected
        </div>
      </div>
      
      <div className="grid grid-cols-8 gap-2 mb-6">
        {Array.from({ length: totalNumbers }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            onClick={() => toggleNumber(num)}
            className={`
              w-12 h-12 rounded-lg font-semibold transition-all
              ${selectedNumbers.includes(num)
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={quickPick} variant="outline" className="flex-1">
          Quick Pick
        </Button>
        <Button onClick={clearSelection} variant="outline" className="flex-1">
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default TicketNumberSelector;
