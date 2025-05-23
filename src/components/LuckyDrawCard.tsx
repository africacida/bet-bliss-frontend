
import React from 'react';
import { Button } from '@/components/ui/button';

interface LuckyDrawItem {
  id: string;
  icon: string;
  name: string;
  odds: string;
}

interface LuckyDrawCardProps {
  item: LuckyDrawItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  betAmount: number;
}

const LuckyDrawCard = ({ item, isSelected, onSelect, betAmount }: LuckyDrawCardProps) => {
  return (
    <div
      className={`
        border-2 rounded-lg p-4 cursor-pointer transition-all
        ${isSelected 
          ? 'border-green-500 bg-green-500/20' 
          : 'border-white/20 bg-white/10 hover:border-white/40'
        }
      `}
      onClick={() => onSelect(item.id)}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">{item.icon}</div>
        <h3 className="text-white font-semibold mb-1">{item.name}</h3>
        <p className="text-white/70 text-sm mb-3">{item.odds}</p>
        {isSelected && (
          <div className="text-green-400 font-medium">
            Bet: ₵{betAmount}
          </div>
        )}
      </div>
    </div>
  );
};

export default LuckyDrawCard;
