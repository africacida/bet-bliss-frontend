
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Wallet = () => {
  const [amount, setAmount] = useState('');
  const { user, updateBalance } = useAuth();

  const mockTransactions = [
    { id: '1', type: 'deposit', amount: 100, date: '2025-05-23', description: 'Bank deposit' },
    { id: '2', type: 'game', amount: -5, date: '2025-05-23', description: 'Jackpot ticket purchase' },
    { id: '3', type: 'win', amount: 10, date: '2025-05-23', description: 'Lucky draw win' },
    { id: '4', type: 'game', amount: -2, date: '2025-05-23', description: 'Lucky draw entry' },
    { id: '5', type: 'deposit', amount: 50, date: '2025-05-22', description: 'Mobile money deposit' },
  ];

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (depositAmount > 0) {
      updateBalance(depositAmount);
      setAmount('');
      toast({
        title: "Deposit Successful",
        description: `₵${depositAmount.toFixed(2)} has been added to your wallet.`,
      });
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && withdrawAmount <= (user?.balance || 0)) {
      updateBalance(-withdrawAmount);
      setAmount('');
      toast({
        title: "Withdrawal Successful",
        description: `₵${withdrawAmount.toFixed(2)} has been withdrawn from your wallet.`,
      });
    } else {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount within your balance.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">💼 My Wallet</h1>
        <p className="text-gray-300">Manage your funds and view transaction history</p>
      </div>

      {/* Current Balance */}
      <Card className="mb-8 bg-gradient-to-r from-green-600 to-blue-600 border-none">
        <CardContent className="p-8 text-center">
          <p className="text-white/80 text-lg mb-2">Current Balance</p>
          <p className="text-5xl font-bold text-white">₵{user?.balance.toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Deposit/Withdraw */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">💰 Deposit Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            <Button 
              onClick={handleDeposit}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
            >
              Deposit
            </Button>
            <div className="text-xs text-gray-400">
              Supported: Bank transfer, Mobile money, Credit card
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">💸 Withdraw Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            <Button 
              onClick={handleWithdraw}
              className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600"
            >
              Withdraw
            </Button>
            <div className="text-xs text-gray-400">
              Min: ₵10 | Processing time: 1-3 business days
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">📊 Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'deposit' ? 'bg-green-600' :
                    transaction.type === 'win' ? 'bg-blue-600' :
                    'bg-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '💰' :
                     transaction.type === 'win' ? '🏆' : '🎮'}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{transaction.description}</p>
                    <p className="text-gray-400 text-sm">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-bold ${
                  transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₵{Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
