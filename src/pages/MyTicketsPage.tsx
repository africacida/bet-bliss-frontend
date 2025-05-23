
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar, Trophy } from 'lucide-react';

const MyTicketsPage = () => {
  const tickets = [
    { 
      id: '1', 
      numbers: [5, 12, 23, 35, 40], 
      drawDate: '2024-01-15', 
      result: 'pending', 
      payout: 0,
      drawType: 'Weekly Jackpot',
      ticketPrice: 5
    },
    { 
      id: '2', 
      numbers: [1, 8, 19, 27, 38], 
      drawDate: '2024-01-08', 
      result: 'lost', 
      payout: 0,
      drawType: 'Weekly Jackpot',
      ticketPrice: 5
    },
    { 
      id: '3', 
      numbers: [3, 14, 21, 29, 36], 
      drawDate: '2024-01-01', 
      result: 'won', 
      payout: 150,
      drawType: 'Weekly Jackpot',
      ticketPrice: 5
    },
    { 
      id: '4', 
      numbers: [7, 15, 22, 31, 39], 
      drawDate: '2023-12-25', 
      result: 'lost', 
      payout: 0,
      drawType: 'Holiday Special',
      ticketPrice: 10
    }
  ];

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'won':
        return 'bg-green-500/20 text-green-400';
      case 'lost':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalSpent = tickets.reduce((sum, ticket) => sum + ticket.ticketPrice, 0);
  const totalWon = tickets.reduce((sum, ticket) => sum + ticket.payout, 0);
  const pendingTickets = tickets.filter(ticket => ticket.result === 'pending').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">My Jackpot Tickets</h1>
        <p className="text-white/80 text-lg">View all your jackpot tickets and results</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <Ticket className="h-10 w-10 text-blue-400 mx-auto mb-2" />
            <CardTitle className="text-white">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-white">{tickets.length}</div>
            <div className="text-white/70 text-sm">All time</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <Calendar className="h-10 w-10 text-yellow-400 mx-auto mb-2" />
            <CardTitle className="text-white">Pending Draws</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-white">{pendingTickets}</div>
            <div className="text-white/70 text-sm">Awaiting results</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <Trophy className="h-10 w-10 text-green-400 mx-auto mb-2" />
            <CardTitle className="text-white">Net Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-3xl font-bold ${totalWon >= totalSpent ? 'text-green-400' : 'text-red-400'}`}>
              {totalWon >= totalSpent ? '+' : ''}₵{(totalWon - totalSpent).toFixed(2)}
            </div>
            <div className="text-white/70 text-sm">Won ₵{totalWon} / Spent ₵{totalSpent}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Ticket History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border border-white/20 rounded-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-white font-semibold">Ticket #{ticket.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getResultBadge(ticket.result)}`}>
                        {ticket.result.charAt(0).toUpperCase() + ticket.result.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ticket.numbers.map((num) => (
                        <span key={num} className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold">
                          {num}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-white/70 text-sm">
                      <div>{ticket.drawType} • Draw Date: {ticket.drawDate}</div>
                      <div>Ticket Price: ₵{ticket.ticketPrice}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {ticket.result === 'won' && (
                      <div className="text-green-400 font-bold text-xl mb-2">
                        +₵{ticket.payout}
                      </div>
                    )}
                    {ticket.result === 'pending' && (
                      <Button variant="outline" size="sm" className="border-white/20 text-white">
                        View Draw
                      </Button>
                    )}
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

export default MyTicketsPage;
