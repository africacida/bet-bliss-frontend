
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Confetti from '@/components/Confetti';

interface LuckyDrawResult {
  selectedItem: string;
  winningItem: string;
  payout: number;
  isWinner: boolean;
  multiplier: string;
}

interface LuckyDrawResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: LuckyDrawResult | null;
}

const LuckyDrawResultModal = ({ isOpen, onClose, result }: LuckyDrawResultModalProps) => {
  if (!result) return null;

  return (
    <>
      <Confetti show={isOpen && result.isWinner} />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-slate-900 border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-xl">
              Lucky Draw Result
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="text-6xl mb-4">{result.winningItem}</div>
              <div className="text-lg text-white mb-2">Winning Item</div>
              
              {result.isWinner ? (
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-400">🎉 You Won!</div>
                  <div className="text-3xl font-bold text-green-400">₵{result.payout}</div>
                  <div className="text-sm text-green-300">{result.multiplier} multiplier</div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xl font-semibold text-red-400">😔 Not this time</div>
                  <div className="text-sm text-gray-400">
                    You picked {result.selectedItem} but {result.winningItem} won
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <Button onClick={onClose} className="w-full">
                Play Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LuckyDrawResultModal;
