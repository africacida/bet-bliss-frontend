
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoGame } from '@/contexts/DemoGameContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NumberSelector from '@/components/NumberSelector';
import CountdownTimer from '@/components/CountdownTimer';
import JackpotResultModal from '@/components/JackpotResultModal';
import { toast } from '@/hooks/use-toast';

const JackpotGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const { user } = useAuth();
  const { 
    jackpotTickets, 
    buyJackpotTicket, 
    balance, 
    isProcessing,
    nextDrawTime 
  } = useDemoGame();
  
  const ticketPrice = 5;

  const handleBuyTicket = async () => {
    if (selectedNumbers.length !== 6) {
      toast({
        title: "Invalid Selection",
        description: "Please select exactly 6 numbers.",
        variant: "destructive"
      });
      return;
    }

    if (balance < ticketPrice) {
      toast({
        title: "Insufficient Balance",
        description: "Please add funds to your wallet.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Processing...",
      description: "Drawing numbers and checking results...",
    });

    try {
      const { ticket, isWinner } = await buyJackpotTicket(selectedNumbers);
      
      setLastResult({
        numbers: ticket.numbers,
        winningNumbers: ticket.winningNumbers,
        matchCount: ticket.matchCount,
        payout: ticket.payout,
        isWinner
      });
      
      setShowResult(true);
      setSelectedNumbers([]);
      
      if (isWinner) {
        toast({
          title: "🎉 Congratulations!",
          description: `You won ₵${ticket.payout} with ${ticket.matchCount} matches!`,
        });
      } else {
        toast({
          title: "Better luck next time!",
          description: "No matches this round. Try again!",
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
        <h1 className="text-3xl font-bold text-white mb-2">🎰 Jackpot Lottery</h1>
        <p className="text-gray-300">Pick 6 numbers from 1-49 and win the jackpot!</p>
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
                <li>Select 6 numbers from 1 to 49</li>
                <li>Purchase your ticket for ₵5</li>
                <li>Wait for the draw results (instant demo)</li>
                <li>Match numbers to win prizes!</li>
                <li>5 matches = ₵50,000 • 4 = ₵1,000 • 3 = ₵50 • 2 = ₵10</li>
              </ol>
            </CardContent>
          </Card>

          {/* Number Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Select Your Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <NumberSelector
                onNumbersSelected={setSelectedNumbers}
                maxNumbers={6}
                maxValue={49}
              />
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-white">
                  <p className="text-lg font-semibold">Ticket Price: ₵{ticketPrice}</p>
                  <p className="text-sm text-gray-400">Your Balance: ₵{balance.toFixed(2)}</p>
                </div>
                <Button
                  onClick={handleBuyTicket}
                  disabled={selectedNumbers.length !== 6 || balance < ticketPrice || isProcessing}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Buy Ticket'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Next Draw */}
          <CountdownTimer targetDate={nextDrawTime} />

          {/* Current Jackpot */}
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 border-none">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">Current Jackpot</h3>
              <div className="text-3xl font-bold text-white">₵50,000</div>
              <p className="text-white/80 text-sm mt-2">Match all 6 numbers!</p>
            </CardContent>
          </Card>

          {/* Recent Winners */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Recent Winners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white font-semibold">Demo Player</p>
                  <p className="text-green-400">₵1,000</p>
                  <p className="text-xs text-gray-400">4 matches</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white font-semibold">Lucky User</p>
                  <p className="text-green-400">₵50</p>
                  <p className="text-xs text-gray-400">3 matches</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* My Tickets */}
      <div className="mt-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">My Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jackpotTickets.slice(0, 6).map((ticket) => (
                <div key={ticket.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">
                      {new Date(ticket.purchaseTime).toLocaleDateString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === 'won' ? 'bg-green-600 text-green-100' :
                      'bg-red-600 text-red-100'
                    }`}>
                      {ticket.status === 'won' ? `Won ₵${ticket.payout}` : 'No win'}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1 mb-2">
                    {ticket.numbers.map((num) => (
                      <div
                        key={num}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          ticket.winningNumbers.includes(num)
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">
                    {ticket.matchCount} matches • Price: ₵{ticket.price}
                  </div>
                </div>
              ))}
              {jackpotTickets.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-8">
                  No tickets purchased yet. Buy your first ticket above!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <JackpotResultModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        result={lastResult}
      />
    </div>
  );
};

export default JackpotGame;
