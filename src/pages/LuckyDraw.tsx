
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer';
import { toast } from '@/hooks/use-toast';

const LuckyDraw = () => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const { user, updateBalance } = useAuth();
  const { luckyDrawEntries, addLuckyDrawEntry, nextDrawTime } = useGame();
  
  const entryPrice = 2;
  const availableItems = ['🍎', '🍌', '🍇', '🍒', '🥝', '🍊', '🥭', '🍓'];
  const lastWinner = { item: '🍇', winner: 'Alex M.', time: '14:29' };

  const handleJoinDraw = () => {
    if (!selectedItem) {
      toast({
        title: "No Selection",
        description: "Please select an item to join the draw.",
        variant: "destructive"
      });
      return;
    }

    if (user && user.balance >= entryPrice) {
      addLuckyDrawEntry(selectedItem);
      updateBalance(-entryPrice);
      setSelectedItem('');
      toast({
        title: "Entry Submitted!",
        description: `You've joined the next draw with ${selectedItem} for ₵${entryPrice}.`,
      });
    } else {
      toast({
        title: "Insufficient Balance",
        description: "Please add funds to your wallet.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🎮 Real-Time Lucky Draw</h1>
        <p className="text-gray-300">Pick your lucky item and win instantly! Draws every minute.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Game Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* How to Play */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">How to Play</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>Choose your lucky item from the selection below</li>
                <li>Pay ₵2 to join the next draw</li>
                <li>Wait for the countdown to reach zero</li>
                <li>If your item is drawn, you win ₵10!</li>
              </ol>
            </CardContent>
          </Card>

          {/* Item Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Choose Your Lucky Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
                {availableItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedItem(item)}
                    className={`
                      w-16 h-16 rounded-lg text-3xl transition-all duration-200 transform hover:scale-110
                      ${selectedItem === item
                        ? 'bg-gradient-to-r from-green-400 to-blue-500 shadow-lg'
                        : 'bg-white/10 hover:bg-white/20'
                      }
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
              
              {selectedItem && (
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <p className="text-white font-semibold">Selected: {selectedItem}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <p className="text-lg font-semibold">Entry Price: ₵{entryPrice}</p>
                  <p className="text-sm text-gray-400">Your Balance: ₵{user?.balance.toFixed(2)}</p>
                  <p className="text-sm text-green-400">Win: ₵10</p>
                </div>
                <Button
                  onClick={handleJoinDraw}
                  disabled={!selectedItem || (user?.balance || 0) < entryPrice}
                  className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 disabled:opacity-50"
                >
                  Join Draw
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Next Draw Timer */}
          <CountdownTimer 
            targetDate={nextDrawTime}
            onComplete={() => window.location.reload()}
          />

          {/* Last Draw Result */}
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-none">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">Last Draw Result</h3>
              <div className="text-4xl mb-2">{lastWinner.item}</div>
              <p className="text-white font-semibold">{lastWinner.winner} won!</p>
              <p className="text-white/80 text-sm">at {lastWinner.time}</p>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Draws:</span>
                  <span className="text-white">847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Your Entries:</span>
                  <span className="text-white">{luckyDrawEntries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Win Rate:</span>
                  <span className="text-green-400">12.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* My Entries */}
      <div className="mt-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">My Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {luckyDrawEntries.slice(0, 6).map((entry) => (
                <div key={entry.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-3xl">{entry.item}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      entry.result === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                      entry.result === 'won' ? 'bg-green-600 text-green-100' :
                      'bg-red-600 text-red-100'
                    }`}>
                      {entry.result}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <p>Draw: {entry.drawTime}</p>
                    <p>Entry: ₵{entry.price}</p>
                    {entry.winningItem && (
                      <p>Winner: {entry.winningItem}</p>
                    )}
                  </div>
                </div>
              ))}
              {luckyDrawEntries.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-8">
                  No entries yet. Join your first draw above!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LuckyDraw;
