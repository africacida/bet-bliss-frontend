
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoGame } from '@/contexts/DemoGameContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer';
import LuckyDrawResultModal from '@/components/LuckyDrawResultModal';
import { toast } from '@/hooks/use-toast';

const LuckyDraw = () => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedMultiplier, setSelectedMultiplier] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const { user } = useAuth();
  const { 
    luckyDrawEntries, 
    placeLuckyDrawBet, 
    balance, 
    isProcessing,
    nextDrawTime 
  } = useDemoGame();
  
  const baseEntryPrice = 2;
  const entryPrice = baseEntryPrice * selectedMultiplier;
  
  const availableItems = [
    { emoji: '🍎', name: 'Apple', odds: '1:4 (4x)', basePayout: 8 },
    { emoji: '🍌', name: 'Banana', odds: '1:5 (5x)', basePayout: 10 },
    { emoji: '🍇', name: 'Grapes', odds: '1:6 (6x)', basePayout: 12 },
    { emoji: '🍒', name: 'Cherry', odds: '1:8 (8x)', basePayout: 16 },
    { emoji: '🥝', name: 'Kiwi', odds: '1:10 (10x)', basePayout: 20 },
    { emoji: '🍊', name: 'Orange', odds: '1:12 (12x)', basePayout: 24 },
    { emoji: '🥭', name: 'Mango', odds: '1:15 (15x)', basePayout: 30 },
    { emoji: '🍓', name: 'Strawberry', odds: '1:20 (20x)', basePayout: 40 }
  ];

  const multiplierOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleJoinDraw = async () => {
    if (!selectedItem) {
      toast({
        title: "No Selection",
        description: "Please select an item to join the draw.",
        variant: "destructive"
      });
      return;
    }

    if (balance < entryPrice) {
      toast({
        title: "Insufficient Balance",
        description: "Please add funds to your wallet.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Drawing...",
      description: `Your ${selectedMultiplier}x entry has been submitted. Drawing in progress...`,
    });

    try {
      const { entry, isWinner } = await placeLuckyDrawBet(selectedItem, selectedMultiplier);
      
      setLastResult({
        selectedItem: entry.selectedItem,
        winningItem: entry.winningItem,
        payout: entry.payout,
        isWinner,
        multiplier: entry.multiplier
      });
      
      setShowResult(true);
      setSelectedItem('');
      
      if (isWinner) {
        toast({
          title: "🎉 You Won!",
          description: `${selectedItem} was drawn! You won ₵${entry.payout}!`,
        });
      } else {
        toast({
          title: "Not this time!",
          description: `${entry.winningItem} was drawn. Better luck next time!`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
                <li>Select your multiplier (1x to 10x) for higher stakes</li>
                <li>Pay ₵{baseEntryPrice} × multiplier to join the instant draw</li>
                <li>Watch the draw happen in real-time</li>
                <li>If your item is drawn, you win based on the multiplier!</li>
                <li>Higher payouts have lower odds - choose wisely!</li>
              </ol>
            </CardContent>
          </Card>

          {/* Multiplier Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Select Multiplier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-4">
                {multiplierOptions.map((multiplier) => (
                  <button
                    key={multiplier}
                    onClick={() => setSelectedMultiplier(multiplier)}
                    className={`
                      p-3 rounded-lg text-center transition-all duration-200 font-semibold
                      ${selectedMultiplier === multiplier
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    {multiplier}x
                  </button>
                ))}
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex justify-between items-center text-white">
                  <span>Entry Cost:</span>
                  <span className="font-bold text-xl">₵{entryPrice}</span>
                </div>
                {selectedItem && (
                  <div className="flex justify-between items-center text-green-400 mt-2">
                    <span>Potential Win:</span>
                    <span className="font-bold text-xl">
                      ₵{(availableItems.find(item => item.emoji === selectedItem)?.basePayout || 0) * selectedMultiplier}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Item Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Choose Your Lucky Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {availableItems.map((item) => (
                  <button
                    key={item.emoji}
                    onClick={() => setSelectedItem(item.emoji)}
                    className={`
                      p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105
                      ${selectedItem === item.emoji
                        ? 'bg-gradient-to-r from-green-400 to-blue-500 shadow-lg'
                        : 'bg-white/10 hover:bg-white/20'
                      }
                    `}
                  >
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <div className="text-white font-semibold text-sm">{item.name}</div>
                    <div className="text-white/70 text-xs">{item.odds}</div>
                    <div className="text-green-400 text-xs font-semibold">
                      Win: ₵{item.basePayout * selectedMultiplier}
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedItem && (
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <p className="text-white font-semibold">Selected: {selectedItem}</p>
                  <p className="text-green-400 text-sm">
                    Potential Win: ₵{(availableItems.find(item => item.emoji === selectedItem)?.basePayout || 0) * selectedMultiplier}
                  </p>
                  <p className="text-purple-400 text-sm">
                    Multiplier: {selectedMultiplier}x
                  </p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <p className="text-lg font-semibold">Entry Price: ₵{entryPrice}</p>
                  <p className="text-sm text-gray-400">Your Balance: ₵{balance.toFixed(2)}</p>
                </div>
                <Button
                  onClick={handleJoinDraw}
                  disabled={!selectedItem || balance < entryPrice || isProcessing}
                  className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 disabled:opacity-50"
                >
                  {isProcessing ? 'Drawing...' : `Join Draw - ₵${entryPrice}`}
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

          {/* Statistics */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Entries:</span>
                  <span className="text-white">{luckyDrawEntries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Wins:</span>
                  <span className="text-green-400">
                    {luckyDrawEntries.filter(e => e.result === 'won').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Win Rate:</span>
                  <span className="text-green-400">
                    {luckyDrawEntries.length > 0 
                      ? Math.round((luckyDrawEntries.filter(e => e.result === 'won').length / luckyDrawEntries.length) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Winner */}
          {luckyDrawEntries.length > 0 && luckyDrawEntries[0].result === 'won' && (
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-none">
              <CardContent className="p-6 text-center">
                <h3 className="text-white text-lg font-semibold mb-2">Your Last Win!</h3>
                <div className="text-4xl mb-2">{luckyDrawEntries[0].selectedItem}</div>
                <p className="text-white font-semibold">₵{luckyDrawEntries[0].payout}</p>
                <p className="text-white/80 text-sm">
                  {new Date(luckyDrawEntries[0].drawTime).toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* My Recent Entries */}
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
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.selectedItem}</span>
                      <span className="text-white/50">→</span>
                      <span className="text-2xl">{entry.winningItem}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      entry.result === 'won' ? 'bg-green-600 text-green-100' :
                      'bg-red-600 text-red-100'
                    }`}>
                      {entry.result === 'won' ? `+₵${entry.payout}` : 'Lost'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <p>Draw: {entry.drawTime}</p>
                    <p>Entry: ₵{entry.price}</p>
                    {entry.result === 'won' && (
                      <p className="text-green-400">{entry.multiplier} multiplier</p>
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

      <LuckyDrawResultModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        result={lastResult}
      />
    </div>
  );
};

export default LuckyDraw;
