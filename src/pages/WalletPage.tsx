
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoGame } from '@/contexts/DemoGameContext';
import WalletModal from '@/components/WalletModal';
import TransactionTable from '@/components/TransactionTable';

const WalletPage = () => {
  const { user } = useAuth();
  const { balance, transactions, updateBalance, addTransaction } = useDemoGame();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deposit' | 'withdraw'>('deposit');

  const handleModalConfirm = (amount: number) => {
    if (modalType === 'deposit') {
      updateBalance(amount);
      addTransaction({
        type: 'deposit',
        amount,
        description: 'Demo Deposit'
      });
    } else {
      if (balance >= amount) {
        updateBalance(-amount);
        addTransaction({
          type: 'withdraw',
          amount,
          description: 'Demo Withdrawal'
        });
      } else {
        alert('Insufficient balance');
        return;
      }
    }
    alert(`${modalType === 'deposit' ? 'Deposit' : 'Withdrawal'} of ₵${amount} successful!`);
  };

  const openModal = (type: 'deposit' | 'withdraw') => {
    setModalType(type);
    setModalOpen(true);
  };

  // Calculate stats from transactions
  const totalDeposits = transactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalWinnings = transactions
    .filter(t => t.type === 'win')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalBets = transactions
    .filter(t => t.type === 'bet')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingWithdrawals = transactions
    .filter(t => t.type === 'withdraw' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">My Wallet</h1>
        <p className="text-white/80 text-lg">Manage your funds and view transaction history</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <Card className="bg-gradient-to-r from-green-600 to-green-700 border-none">
          <CardHeader className="text-center">
            <Wallet className="h-12 w-12 text-white mx-auto mb-2" />
            <CardTitle className="text-white">Current Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-white mb-4">₵{balance.toFixed(2)}</div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => openModal('deposit')}
                className="bg-white/20 hover:bg-white/30 text-white border-none"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Funds
              </Button>
              <Button 
                onClick={() => openModal('withdraw')}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                size="sm"
              >
                <Minus className="h-4 w-4 mr-1" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/70">Total Deposits</span>
                <span className="text-green-400 font-semibold">₵{totalDeposits.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Winnings</span>
                <span className="text-green-400 font-semibold">₵{totalWinnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Bets</span>
                <span className="text-red-400 font-semibold">₵{totalBets.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Verification</span>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                  Demo Mode
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Withdrawal Limit</span>
                <span className="text-white">₵5,000/day</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Pending Withdrawals</span>
                <span className="text-yellow-400">₵{pendingWithdrawals.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TransactionTable transactions={transactions} />

      <WalletModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default WalletPage;
