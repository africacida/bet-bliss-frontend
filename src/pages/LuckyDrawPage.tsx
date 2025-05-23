
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LuckyDrawCard from '@/components/LuckyDrawCard';
import DrawCountdown from '@/components/DrawCountdown';
import { useAuth } from '@/contexts/AuthContext';

const LuckyDrawPage = () => {
  const { user, updateBalance } = useAuth();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [betAmount] = useState(2);
  const [userEntries, setUserEntries] = useState([
    { id: '1', item: '🍎', betAmount: 2, result: 'won', payout: 10, time: '2024-01-10 15:30' },
    { id: '2', item: '🍌', betAmount: 2, result: 'lost', payout: 0, time: '2024-01-10 15:29' },
    { id: '3', item: '🍇', betAmount: 2, result: 'won', payout: 6, time: '2024-01-10 15:28' }
  ]);

  const nextDrawDate = new Date(Date.now() + 45 * 1000); // 45 seconds from now

  const luckyItems = [
    { id: 'apple', icon: '🍎', name: 'Apple', odds: '1:3 (5x)' },
    { id: 'banana', icon: '🍌', name: 'Banana', odds: '1:4 (6x)' },
    { id: 'grapes', icon: '🍇', name: 'Grapes', odds: '1:5 (8x)' },
    { id: 'cherry', icon: '🍒', name: 'Cherry', odds: '1:6 (10x)' },
    { id: 'orange', icon: '🍊', name: 'Orange', odds: '1:4 (6x)' },
    { id: 'watermelon', icon: '🍉', name: 'Watermelon', odds: '1:8 (15x)' }
  ];

  const recentResults = [
    { time: '15:30', winningItem: '🍎', entries: 45, winners: 15 },
    { time: '15:29', winningItem: '🍒', entries: 38, winners: 6 },
    { time: '15:28', winningItem: '🍇', entries: 52, winners: 10 },
    { time: '15:27', winningItem: '🍌', entries: 41, winners: 10 }
  ];

  const handleJoinDraw = () => {
    if (!selectedItem) {
      alert('Please select an item first');
      return;
    }
    if (user && user.balance < betAmount) {
      alert('Insufficient balance');
      return;
    }

    const selectedItemData = luckyItems.find(item => item.id === selectedItem);
    const newEntry = {
      id: Date.now().toString(),
      item: selectedItemData?.icon || '',
      betAmount,
      result: 'pending' as const,
      payout: 0,
      time: new Date().toISOString()
    };

    setUserEntries([newEntry, ...userEntries]);
    updateBalance(-betAmount);
    setSelectedItem('');
    alert('Entry submitted! Wait for the draw result.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Lucky Draw</h1>
        <p className="text-white/80 text-lg">Choose your lucky item and win instant prizes!</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <DrawCountdown targetDate={nextDrawDate} title="Next Draw In:" />
        </div>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Entry Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">₵{betAmount}</div>
              <div className="text-white/70">Per Entry</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
        <CardHeader>
          <CardTitle className="text-white">Select Your Lucky Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {luckyItems.map((item) => (
              <LuckyDrawCard
                key={item.id}
                item={item}
                isSelected={selectedItem === item.id}
                onSelect={setSelectedItem}
                betAmount={betAmount}
              />
            ))}
          </div>
          <div className="text-center">
            <Button 
              onClick={handleJoinDraw}
              disabled={!selectedItem}
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 px-8 py-3"
            >
              Join Draw - ₵{betAmount}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">My Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userEntries.map((entry) => (
                <div key={entry.id} className="border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{entry.item}</span>
                      <div>
                        <div className="text-white font-medium">₵{entry.betAmount}</div>
                        <div className="text-white/60 text-sm">{new Date(entry.time).toLocaleTimeString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-sm ${
                        entry.result === 'won' ? 'bg-green-500/20 text-green-400' :
                        entry.result === 'lost' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {entry.result}
                      </span>
                      {entry.payout > 0 && <div className="text-green-400 font-semibold mt-1">+₵{entry.payout}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result, index) => (
                <div key={index} className="border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{result.winningItem}</span>
                      <div>
                        <div className="text-white font-medium">Winner!</div>
                        <div className="text-white/60 text-sm">{result.time}</div>
                      </div>
                    </div>
                    <div className="text-right text-white/70 text-sm">
                      <div>{result.entries} entries</div>
                      <div>{result.winners} winners</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LuckyDrawPage;
