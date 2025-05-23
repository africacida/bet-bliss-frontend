
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-20 px-4">
        <h1 className="text-6xl font-bold text-white mb-6">
          Welcome to <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">BetBliss</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Experience the thrill of winning with our exciting lottery games. 
          Play the Jackpot Lottery or join our Real-Time Lucky Draws!
        </p>
        
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-lg px-8 py-3">
              Go to Dashboard
            </Button>
          </Link>
        )}
      </div>

      {/* Games Preview */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Our Games</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎰</div>
              <h3 className="text-2xl font-bold text-white mb-4">Jackpot Lottery</h3>
              <p className="text-gray-300 mb-6">
                Pick 6 numbers from 1-49 and win massive jackpots! 
                Draws happen regularly with prizes growing until someone wins.
              </p>
              <div className="text-3xl font-bold text-yellow-400 mb-4">₵150,000</div>
              <div className="text-sm text-gray-400 mb-6">Current Jackpot</div>
              {isAuthenticated ? (
                <Link to="/jackpot">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Play Now
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Join to Play
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-4">Lucky Draw</h3>
              <p className="text-gray-300 mb-6">
                Real-time draws every minute! Choose your lucky item and 
                win instantly. Quick, fun, and exciting!
              </p>
              <div className="text-3xl font-bold text-green-400 mb-4">Every 60s</div>
              <div className="text-sm text-gray-400 mb-6">New Draw</div>
              {isAuthenticated ? (
                <Link to="/lucky-draw">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Join Draw
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Join to Play
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features */}
      <div className="bg-black/20 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose BetBliss?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-2">Secure & Safe</h3>
              <p className="text-gray-300">Your funds and personal information are protected with advanced security measures.</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Payouts</h3>
              <p className="text-gray-300">Winnings are credited instantly to your wallet. Withdraw anytime you want.</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Fair Play</h3>
              <p className="text-gray-300">All draws are conducted fairly with transparent and verifiable results.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
