
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Trophy, TrendingUp } from 'lucide-react';

const LuckyHistoryPage = () => {
  const entries = [
    { 
      id: '1', 
      selectedItem: '🍎', 
      betAmount: 2, 
      drawResult: '🍎', 
      result: 'won', 
      payout: 10, 
      time: '2024-01-10 15:30',
      multiplier: '5x'
    },
    { 
      id: '2', 
      selectedItem: '🍌', 
      betAmount: 2, 
      drawResult: '🍇', 
      result: 'lost', 
      payout: 0, 
      time: '2024-01-10 15:29',
      multiplier: '-'
    },
    { 
      id: '3', 
      selectedItem: '🍇', 
      betAmount: 2, 
      drawResult: '🍇', 
      result: 'won', 
      payout: 16, 
      time: '2024-01-10 15:28',
      multiplier: '8x'
    },
    { 
      id: '4', 
      selectedItem: '🍒', 
      betAmount: 2, 
      drawResult: '🍊', 
      result: 'lost', 
      payout: 0, 
      time: '2024-01-10 15:27',
      multiplier: '-'
    },
    { 
      id: '5', 
      selectedItem: '🍊', 
      betAmount: 2, 
      drawResult: '🍊', 
      result: 'won', 
      payout: 12, 
      time: '2024-01-10 15:26',
      multiplier: '6x'
    }
  ];

  const totalBet = entries.reduce((sum, entry) => sum + entry.betAmount, 0);
  const totalWon = entries.reduce((sum, entry) => sum + entry.payout, 0);
  const winRate = Math.round((entries.filter(entry => entry.result === 'won').length / entries.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Lucky Draw History</h1>
        <p className="text-white/80 text-lg">View all your lucky draw entries and results</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <Zap className="h-10 w-10 text-purple-400 mx-auto mb-2" />
            <CardTitle className="text-white">Total Entries</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-white">{entries.length}</div>
            <div className="text-white/70 text-sm">All time</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <TrendingUp className="h-10 w-10 text-blue-400 mx-auto mb-2" />
            <CardTitle className="text-white">Win Rate</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-white">{winRate}%</div>
            <div className="text-white/70 text-sm">{entries.filter(e => e.result === 'won').length} wins</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <Trophy className="h-10 w-10 text-green-400 mx-auto mb-2" />
            <CardTitle className="text-white">Net Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-3xl font-bold ${totalWon >= totalBet ? 'text-green-400' : 'text-red-400'}`}>
              {totalWon >= totalBet ? '+' : ''}₵{(totalWon - totalBet).toFixed(2)}
            </div>
            <div className="text-white/70 text-sm">Won ₵{totalWon} / Bet ₵{totalBet}</div>
          </CardContent>
        </Card>
      </div>

      {/* Entries List */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Entry History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="border border-white/20 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{entry.selectedItem}</span>
                        <span className="text-white/50">→</span>
                        <span className="text-3xl">{entry.drawResult}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        entry.result === 'won' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {entry.result === 'won' ? 'WON' : 'LOST'}
                      </span>
                      {entry.result === 'won' && (
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-sm font-medium">
                          {entry.multiplier}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-white/70 text-sm">
                      <div>Bet: ₵{entry.betAmount} • Time: {entry.time}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold text-xl ${
                      entry.result === 'won' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {entry.result === 'won' ? '+' : '-'}₵{entry.result === 'won' ? entry.payout : entry.betAmount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LuckyHistoryPage;
