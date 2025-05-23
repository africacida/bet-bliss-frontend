
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
  onConfirm: (amount: number) => void;
}

const WalletModal = ({ isOpen, onClose, type, onConfirm }: WalletModalProps) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onConfirm(numAmount);
      setAmount('');
      onClose();
    }
  };

  const quickAmounts = [10, 20, 50, 100, 200, 500];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">
            {type === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="amount" className="text-white">Amount (₵)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/10 border-white/20 text-white mt-2"
            />
          </div>

          <div>
            <Label className="text-white">Quick Select</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  onClick={() => setAmount(amt.toString())}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  ₵{amt}
                </Button>
              ))}
            </div>
          </div>

          {type === 'deposit' && (
            <div>
              <Label className="text-white">Payment Method</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="border-white/20"
                >
                  Credit Card
                </Button>
                <Button
                  variant={paymentMethod === 'mobile' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('mobile')}
                  className="border-white/20"
                >
                  Mobile Money
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} className="flex-1 border-white/20 text-white">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              {type === 'deposit' ? 'Add Funds' : 'Withdraw'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
