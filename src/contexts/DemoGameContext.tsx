import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface JackpotTicket {
  id: string;
  numbers: number[];
  winningNumbers: number[];
  drawDate: string;
  price: number;
  status: 'pending' | 'won' | 'lost';
  matchCount: number;
  payout: number;
  purchaseTime: string;
  multiplier: number;
}

interface LuckyDrawEntry {
  id: string;
  selectedItem: string;
  winningItem: string;
  drawTime: string;
  price: number;
  result: 'pending' | 'won' | 'lost';
  payout: number;
  multiplier: string;
}

interface Transaction {
  id: string;
  type: 'bet' | 'win' | 'deposit' | 'withdraw';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

interface DemoGameContextType {
  jackpotTickets: JackpotTicket[];
  luckyDrawEntries: LuckyDrawEntry[];
  transactions: Transaction[];
  balance: number;
  isProcessing: boolean;
  buyJackpotTicket: (numbers: number[], multiplier?: number) => Promise<{ ticket: JackpotTicket; isWinner: boolean }>;
  placeLuckyDrawBet: (item: string) => Promise<{ entry: LuckyDrawEntry; isWinner: boolean }>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => void;
  updateBalance: (amount: number) => void;
  nextDrawTime: Date;
}

const DemoGameContext = createContext<DemoGameContextType | undefined>(undefined);

export const useDemoGame = () => {
  const context = useContext(DemoGameContext);
  if (context === undefined) {
    throw new Error('useDemoGame must be used within a DemoGameProvider');
  }
  return context;
};

// Jackpot payout structure based on matches
const getJackpotPayout = (matches: number, multiplier: number = 1): number => {
  const basePayout = (() => {
    switch (matches) {
      case 6: return 50000; // Jackpot
      case 5: return 1000;
      case 4: return 50;
      case 3: return 10;
      case 2: return 5;
      default: return 0;
    }
  })();
  return basePayout * multiplier;
};

// Lucky draw items with different odds and multipliers
const luckyDrawItems = [
  { emoji: '🍎', odds: 0.25, multiplier: '4x', payout: 8 },
  { emoji: '🍌', odds: 0.20, multiplier: '5x', payout: 10 },
  { emoji: '🍇', odds: 0.15, multiplier: '6x', payout: 12 },
  { emoji: '🍒', odds: 0.12, multiplier: '8x', payout: 16 },
  { emoji: '🥝', odds: 0.10, multiplier: '10x', payout: 20 },
  { emoji: '🍊', odds: 0.08, multiplier: '12x', payout: 24 },
  { emoji: '🥭', odds: 0.06, multiplier: '15x', payout: 30 },
  { emoji: '🍓', odds: 0.04, multiplier: '20x', payout: 40 }
];

const STORAGE_KEYS = {
  JACKPOT_TICKETS: 'betbliss_jackpot_tickets',
  LUCKY_DRAW_ENTRIES: 'betbliss_lucky_draw_entries',
  TRANSACTIONS: 'betbliss_transactions',
  BALANCE: 'betbliss_balance'
};

export const DemoGameProvider = ({ children }: { children: ReactNode }) => {
  const [jackpotTickets, setJackpotTickets] = useState<JackpotTicket[]>([]);
  const [luckyDrawEntries, setLuckyDrawEntries] = useState<LuckyDrawEntry[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(1000); // Starting demo balance
  const [isProcessing, setIsProcessing] = useState(false);
  const [nextDrawTime] = useState(new Date(Date.now() + 60000)); // 1 minute from now

  // Load data from localStorage on mount
  useEffect(() => {
    const loadFromStorage = (key: string, defaultValue: any) => {
      try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
      } catch {
        return defaultValue;
      }
    };

    setJackpotTickets(loadFromStorage(STORAGE_KEYS.JACKPOT_TICKETS, []));
    setLuckyDrawEntries(loadFromStorage(STORAGE_KEYS.LUCKY_DRAW_ENTRIES, []));
    setTransactions(loadFromStorage(STORAGE_KEYS.TRANSACTIONS, []));
    setBalance(loadFromStorage(STORAGE_KEYS.BALANCE, 1000));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JACKPOT_TICKETS, JSON.stringify(jackpotTickets));
  }, [jackpotTickets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LUCKY_DRAW_ENTRIES, JSON.stringify(luckyDrawEntries));
  }, [luckyDrawEntries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BALANCE, JSON.stringify(balance));
  }, [balance]);

  const generateWinningNumbers = (): number[] => {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  };

  const countMatches = (userNumbers: number[], winningNumbers: number[]): number => {
    return userNumbers.filter(num => winningNumbers.includes(num)).length;
  };

  const selectRandomLuckyItem = (): string => {
    const random = Math.random();
    let cumulativeOdds = 0;
    
    for (const item of luckyDrawItems) {
      cumulativeOdds += item.odds;
      if (random <= cumulativeOdds) {
        return item.emoji;
      }
    }
    
    return luckyDrawItems[0].emoji; // Fallback
  };

  const buyJackpotTicket = async (numbers: number[], multiplier: number = 1): Promise<{ ticket: JackpotTicket; isWinner: boolean }> => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const winningNumbers = generateWinningNumbers();
    const matchCount = countMatches(numbers, winningNumbers);
    const payout = getJackpotPayout(matchCount, multiplier);
    const isWinner = payout > 0;
    const ticketPrice = 5 * multiplier;
    
    const ticket: JackpotTicket = {
      id: Date.now().toString(),
      numbers: [...numbers].sort((a, b) => a - b),
      winningNumbers,
      drawDate: new Date().toISOString().split('T')[0],
      price: ticketPrice,
      status: isWinner ? 'won' : 'lost',
      matchCount,
      payout,
      purchaseTime: new Date().toISOString(),
      multiplier
    };

    setJackpotTickets(prev => [ticket, ...prev]);
    
    // Update balance and transactions
    updateBalance(-ticketPrice); // Deduct ticket price
    addTransaction({
      type: 'bet',
      amount: ticketPrice,
      description: `Jackpot Ticket Purchase (${multiplier}x)`
    });

    if (isWinner) {
      updateBalance(payout);
      addTransaction({
        type: 'win',
        amount: payout,
        description: `Jackpot Win - ${matchCount} matches (${multiplier}x)`
      });
    }

    setIsProcessing(false);
    return { ticket, isWinner };
  };

  const placeLuckyDrawBet = async (selectedItem: string): Promise<{ entry: LuckyDrawEntry; isWinner: boolean }> => {
    setIsProcessing(true);
    
    // Simulate draw delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const winningItem = selectRandomLuckyItem();
    const isWinner = selectedItem === winningItem;
    const itemData = luckyDrawItems.find(item => item.emoji === selectedItem);
    const payout = isWinner ? (itemData?.payout || 0) : 0;
    
    const entry: LuckyDrawEntry = {
      id: Date.now().toString(),
      selectedItem,
      winningItem,
      drawTime: new Date().toLocaleString(),
      price: 2,
      result: isWinner ? 'won' : 'lost',
      payout,
      multiplier: itemData?.multiplier || '0x'
    };

    setLuckyDrawEntries(prev => [entry, ...prev]);
    
    // Update balance and transactions
    updateBalance(-2); // Deduct bet price
    addTransaction({
      type: 'bet',
      amount: 2,
      description: 'Lucky Draw Entry'
    });

    if (isWinner) {
      updateBalance(payout);
      addTransaction({
        type: 'win',
        amount: payout,
        description: `Lucky Draw Win - ${selectedItem}`
      });
    }

    setIsProcessing(false);
    return { entry, isWinner };
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateBalance = (amount: number) => {
    setBalance(prev => Math.max(0, prev + amount));
  };

  return (
    <DemoGameContext.Provider
      value={{
        jackpotTickets,
        luckyDrawEntries,
        transactions,
        balance,
        isProcessing,
        buyJackpotTicket,
        placeLuckyDrawBet,
        addTransaction,
        updateBalance,
        nextDrawTime
      }}
    >
      {children}
    </DemoGameContext.Provider>
  );
};
