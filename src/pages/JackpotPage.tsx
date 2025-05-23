
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TicketNumberSelector from '@/components/TicketNumberSelector';
import DrawCountdown from '@/components/DrawCountdown';
import { useAuth } from '@/contexts/AuthContext';

const JackpotPage = () => {
  const { user, updateBalance } = useAuth();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [userTickets, setUserTickets] = useState([
    { id: '1', numbers: [5, 12, 23, 35, 40], drawDate: '2024-01-15', result: 'pending', payout: 0 },
    { id: '2', numbers: [1, 8, 19, 27, 38], drawDate: '2024-01-08', result: 'lost', payout: 0 },
    { id: '3', numbers: [3, 14, 21, 29, 36], drawDate: '2024-01-01', result: 'won', payout: 150 }
  ]);

  const ticketPrice = 5;
  const prizePool = 75000;
  const nextDrawDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

  const pastDraws = [
    { date: '2024-01-08', numbers: [7, 15, 22, 31, 39], jackpot: 45000, winners: 3 },
    { date: '2024-01-01', numbers: [3, 14, 21, 29, 36], jackpot: 38000, winners: 1 },
    { date: '2023-12-25', numbers: [2, 11, 18, 26, 37], jackpot: 42000, winners: 2 }
  ];

  const handleBuyTicket = () => {
    if (selectedNumbers.length !== 5) {
      alert('Please select exactly 5 numbers');
      return;
    }
    if (user && user.balance < ticketPrice) {
      alert('Insufficient balance');
      return;
    }

    const newTicket = {
      id: Date.now().toString(),
      numbers: [...selectedNumbers].sort((a, b) => a - b),
      drawDate: nextDrawDate.toISOString().split('T')[0],
      result: 'pending' as const,
      payout: 0
    };

    setUserTickets([newTicket, ...userTickets]);
    updateBalance(-ticketPrice);
    setSelectedNumbers([]);
    alert('Ticket purchased successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Jackpot Lottery</h1>
        <p className="text-white/80 text-lg">Pick 5 numbers and win up to ₵{prizePool.toLocaleString()}!</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <DrawCountdown targetDate={nextDrawDate} title="Next Draw In:" />
        </div>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Current Jackpot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">₵{prizePool.toLocaleString()}</div>
              <div className="text-white/70">Ticket Price: ₵{ticketPrice}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <TicketNumberSelector
          maxNumbers={5}
          totalNumbers={40}
          selectedNumbers={selectedNumbers}
          onSelectionChange={setSelectedNumbers}
        />
        <div className="text-center mt-6">
          <Button 
            onClick={handleBuyTicket}
            disabled={selectedNumbers.length !== 5}
            size="lg"
            className="bg-green-500 hover:bg-green-600 px-8 py-3"
          >
            Buy Ticket - ₵{ticketPrice}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">My Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userTickets.map((ticket) => (
                <div key={ticket.id} className="border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-2">
                      {ticket.numbers.map((num) => (
                        <span key={num} className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                          {num}
                        </span>
                      ))}
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      ticket.result === 'won' ? 'bg-green-500/20 text-green-400' :
                      ticket.result === 'lost' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {ticket.result}
                    </span>
                  </div>
                  <div className="text-white/70 text-sm">
                    Draw: {ticket.drawDate}
                    {ticket.payout > 0 && <span className="text-green-400 ml-4">Won: ₵{ticket.payout}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Past Draws</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastDraws.map((draw, index) => (
                <div key={index} className="border border-white/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-2">
                      {draw.numbers.map((num) => (
                        <span key={num} className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-white/70 text-sm">
                    {draw.date} • ₵{draw.jackpot.toLocaleString()} • {draw.winners} winner(s)
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

export default JackpotPage;
