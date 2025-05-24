
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
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(1);
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
  
  const baseTicketPrice = 5;
  const ticketPrice = baseTicketPrice * selectedMultiplier;

  const multiplierOptions = [
    { value: 1, label: '1x', color: 'from-gray-500 to-gray-600' },
    { value: 2, label: '2x', color: 'from-blue-500 to-blue-600' },
    { value: 3, label: '3x', color: 'from-green-500 to-green-600' },
    { value: 5, label: '5x', color: 'from-yellow-500 to-yellow-600' },
    { value: 10, label: '10x', color: 'from-red-500 to-red-600' }
  ];

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
      const { ticket, isWinner } = await buyJackpotTicket(selectedNumbers, selectedMultiplier);
      
      setLastResult({
        numbers: ticket.numbers,
        winningNumbers: ticket.winningNumbers,
        matchCount: ticket.matchCount,
        payout: ticket.payout,
        isWinner,
        multiplier: ticket.multiplier
      });
      
      setShowResult(true);
      setSelectedNumbers([]);
      
      if (isWinner) {
        toast({
          title: "🎉 Congratulations!",
          description: `You won ₵${ticket.payout} with ${ticket.matchCount} matches (${selectedMultiplier}x)!`,
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

              {/* Multiplier Selection */}
              <div className="mt-6">
                <h4 className="text-white text-lg font-semibold mb-3">Choose Multiplier</h4>
                <div className="grid grid-cols-5 gap-3">
                  {multiplierOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedMultiplier(option.value)}
                      className={`
                        p-3 rounded-lg transition-all duration-200 transform hover:scale-105
                        ${selectedMultiplier === option.value
                          ? `bg-gradient-to-r ${option.color} text-white shadow-lg border-2 border-white/50`
                          : 'bg-white/10 text-white border-2 border-transparent hover:bg-white/20'
                        }
                      `}
                    >
                      <div className="font-bold text-lg">{option.label}</div>
                      <div className="text-xs">₵{baseTicketPrice * option.value}</div>
                    </button>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  Higher multipliers increase both ticket cost and potential winnings!
                </p>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-white">
                  <p className="text-lg font-semibold">Ticket Price: ₵{ticketPrice}</p>
                  <p className="text-sm text-gray-400">Your Balance: ₵{balance.toFixed(2)}</p>
                  {selectedMultiplier > 1 && (
                    <p className="text-sm text-green-400">
                      Potential max win: ₵{(50000 * selectedMultiplier).toLocaleString()}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleBuyTicket}
                  disabled={selectedNumbers.length !== 6 || balance < ticketPrice || isProcessing}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : `Buy Ticket (${selectedMultiplier}x)`}
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
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        ticket.status === 'won' ? 'bg-green-600 text-green-100' :
                        'bg-red-600 text-red-100'
                      }`}>
                        {ticket.status === 'won' ? `Won ₵${ticket.payout}` : 'No win'}
                      </span>
                      {ticket.multiplier > 1 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-600 text-purple-100">
                          {ticket.multiplier}x
                        </span>
                      )}
                    </div>
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
