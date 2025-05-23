
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const { jackpotTickets, luckyDrawEntries } = useGame();

  const recentTickets = jackpotTickets.slice(0, 3);
  const recentEntries = luckyDrawEntries.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name}! 🎉
        </h1>
        <p className="text-gray-300">Ready to try your luck today?</p>
      </div>

      {/* Wallet Overview */}
      <Card className="mb-8 bg-gradient-to-r from-green-600 to-blue-600 border-none">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/80 text-sm">Current Balance</p>
              <p className="text-3xl font-bold text-white">₵{user?.balance.toFixed(2)}</p>
            </div>
            <Link to="/wallet">
              <Button variant="secondary">Manage Wallet</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Games */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              🎰 Jackpot Lottery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Pick 6 numbers and win big! Next draw on May 25th.
            </p>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-yellow-400">₵150,000</div>
              <div className="text-sm text-gray-400">Current Jackpot</div>
            </div>
            <Link to="/jackpot">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Play Jackpot
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              🎮 Lucky Draw
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Real-time draws every minute! Choose your lucky item.
            </p>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-green-400">45s</div>
              <div className="text-sm text-gray-400">Next Draw</div>
            </div>
            <Link to="/lucky-draw">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Join Draw
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">My Jackpot Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Draw: {ticket.drawDate}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                      ticket.status === 'won' ? 'bg-green-600 text-green-100' :
                      'bg-red-600 text-red-100'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ticket.numbers.map((num) => (
                      <span key={num} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 rounded text-xs">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <Link to="/jackpot">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Tickets
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">My Lucky Draw Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl">{entry.item}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      entry.result === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                      entry.result === 'won' ? 'bg-green-600 text-green-100' :
                      'bg-red-600 text-red-100'
                    }`}>
                      {entry.result}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {entry.drawTime}
                    {entry.winningItem && (
                      <span className="ml-2">Winner: {entry.winningItem}</span>
                    )}
                  </div>
                </div>
              ))}
              <Link to="/lucky-draw">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Entries
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
