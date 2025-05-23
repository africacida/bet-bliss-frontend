
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NumberSelector from '@/components/NumberSelector';
import CountdownTimer from '@/components/CountdownTimer';
import { toast } from '@/hooks/use-toast';

const JackpotGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const { user, updateBalance } = useAuth();
  const { jackpotTickets, addJackpotTicket } = useGame();
  
  const ticketPrice = 5;
  const nextDrawDate = new Date('2025-05-25T20:00:00');

  const handleBuyTicket = () => {
    if (selectedNumbers.length !== 6) {
      toast({
        title: "Invalid Selection",
        description: "Please select exactly 6 numbers.",
        variant: "destructive"
      });
      return;
    }

    if (user && user.balance >= ticketPrice) {
      addJackpotTicket(selectedNumbers);
      updateBalance(-ticketPrice);
      setSelectedNumbers([]);
      toast({
        title: "Ticket Purchased!",
        description: `Your ticket for ₵${ticketPrice} has been purchased.`,
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
                <li>Wait for the draw on the scheduled date</li>
                <li>Match all 6 numbers to win the jackpot!</li>
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
                  <p className="text-sm text-gray-400">Your Balance: ₵{user?.balance.toFixed(2)}</p>
                </div>
                <Button
                  onClick={handleBuyTicket}
                  disabled={selectedNumbers.length !== 6 || (user?.balance || 0) < ticketPrice}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50"
                >
                  Buy Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Next Draw */}
          <CountdownTimer targetDate={nextDrawDate} />

          {/* Current Jackpot */}
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 border-none">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-lg font-semibold mb-2">Current Jackpot</h3>
              <div className="text-3xl font-bold text-white">₵150,000</div>
              <p className="text-white/80 text-sm mt-2">Growing with every ticket!</p>
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
                  <p className="text-white font-semibold">Sarah K.</p>
                  <p className="text-green-400">₵25,000</p>
                  <p className="text-xs text-gray-400">May 18, 2025</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white font-semibold">Mike D.</p>
                  <p className="text-green-400">₵75,000</p>
                  <p className="text-xs text-gray-400">May 15, 2025</p>
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
            <CardTitle className="text-white">My Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jackpotTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">Draw: {ticket.drawDate}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                      ticket.status === 'won' ? 'bg-green-600 text-green-100' :
                      'bg-red-600 text-red-100'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {ticket.numbers.map((num) => (
                      <div key={num} className="bg-gradient-to-r from-green-400 to-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                        {num}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Price: ₵{ticket.price}
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
    </div>
  );
};

export default JackpotGame;
