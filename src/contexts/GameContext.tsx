
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JackpotTicket {
  id: string;
  numbers: number[];
  drawDate: string;
  price: number;
  status: 'pending' | 'won' | 'lost';
}

interface LuckyDrawEntry {
  id: string;
  item: string;
  drawTime: string;
  price: number;
  result: 'pending' | 'won' | 'lost';
  winningItem?: string;
}

interface GameContextType {
  jackpotTickets: JackpotTicket[];
  luckyDrawEntries: LuckyDrawEntry[];
  addJackpotTicket: (numbers: number[]) => void;
  addLuckyDrawEntry: (item: string) => void;
  nextDrawTime: Date;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

const mockJackpotTickets: JackpotTicket[] = [
  {
    id: '1',
    numbers: [5, 12, 23, 34, 41, 47],
    drawDate: '2025-05-25',
    price: 5,
    status: 'pending'
  },
  {
    id: '2',
    numbers: [1, 8, 15, 22, 29, 36],
    drawDate: '2025-05-20',
    price: 5,
    status: 'lost'
  }
];

const mockLuckyDrawEntries: LuckyDrawEntry[] = [
  {
    id: '1',
    item: '🍎',
    drawTime: '2025-05-23 14:30',
    price: 2,
    result: 'won',
    winningItem: '🍎'
  },
  {
    id: '2',
    item: '🍌',
    drawTime: '2025-05-23 14:25',
    price: 2,
    result: 'lost',
    winningItem: '🍇'
  }
];

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [jackpotTickets, setJackpotTickets] = useState<JackpotTicket[]>(mockJackpotTickets);
  const [luckyDrawEntries, setLuckyDrawEntries] = useState<LuckyDrawEntry[]>(mockLuckyDrawEntries);
  const [nextDrawTime] = useState(new Date(Date.now() + 45000)); // 45 seconds from now

  const addJackpotTicket = (numbers: number[]) => {
    const newTicket: JackpotTicket = {
      id: Date.now().toString(),
      numbers,
      drawDate: '2025-05-25',
      price: 5,
      status: 'pending'
    };
    setJackpotTickets(prev => [newTicket, ...prev]);
  };

  const addLuckyDrawEntry = (item: string) => {
    const newEntry: LuckyDrawEntry = {
      id: Date.now().toString(),
      item,
      drawTime: new Date(Date.now() + 60000).toLocaleString(),
      price: 2,
      result: 'pending'
    };
    setLuckyDrawEntries(prev => [newEntry, ...prev]);
  };

  return (
    <GameContext.Provider
      value={{
        jackpotTickets,
        luckyDrawEntries,
        addJackpotTicket,
        addLuckyDrawEntry,
        nextDrawTime
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
