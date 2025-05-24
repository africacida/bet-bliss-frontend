
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Ticket, Trophy, Users } from 'lucide-react';

const Home = () => {
  const recentWinners = [
    { name: 'John D.', game: 'Jackpot', amount: 5000, time: '2 hours ago' },
    { name: 'Sarah M.', game: 'Lucky Draw', amount: 150, time: '4 hours ago' },
    { name: 'Mike R.', game: 'Jackpot', amount: 1200, time: '1 day ago' },
    { name: 'Lisa K.', game: 'Lucky Draw', amount: 300, time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-green-400">BetBliss</span>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Your lucky numbers await! Play jackpot and lucky draw games for a chance to win big.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jackpot">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Play Jackpot
              </Button>
            </Link>
            <Link to="/lucky-draw">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                <Ticket className="mr-2 h-5 w-5" />
                Play Lucky Draw
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2 h-6 w-6 text-green-400" />
                  Jackpot Game
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">
                <ol className="space-y-2">
                  <li>1. Pick 5 numbers from 1 to 40</li>
                  <li>2. Buy your ticket for ₵5</li>
                  <li>3. Wait for the weekly draw</li>
                  <li>4. Win up to ₵100,000!</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Ticket className="mr-2 h-6 w-6 text-purple-400" />
                  Lucky Draw
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/80">
                <ol className="space-y-2">
                  <li>1. Choose your lucky item</li>
                  <li>2. Place bet for ₵2</li>
                  <li>3. Wait 60 seconds for result</li>
                  <li>4. Win instant prizes!</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">₵2.5M</div>
              <div className="text-white/70">Total Winnings</div>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">15,342</div>
              <div className="text-white/70">Happy Players</div>
            </div>
            <div className="text-center">
              <Ticket className="h-12 w-12 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">50,821</div>
              <div className="text-white/70">Tickets Sold</div>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1,234</div>
              <div className="text-white/70">Winners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Winners */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Recent Winners</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentWinners.map((winner, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-semibold">{winner.name}</h3>
                      <p className="text-white/70">{winner.game}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">₵{winner.amount}</div>
                      <div className="text-white/60 text-sm">{winner.time}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
