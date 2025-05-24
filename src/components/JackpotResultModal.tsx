
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Confetti from '@/components/Confetti';

interface JackpotResult {
  numbers: number[];
  winningNumbers: number[];
  matchCount: number;
  payout: number;
  isWinner: boolean;
}

interface JackpotResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: JackpotResult | null;
}

const JackpotResultModal = ({ isOpen, onClose, result }: JackpotResultModalProps) => {
  if (!result) return null;

  const getMatchMessage = (matches: number) => {
    switch (matches) {
      case 5: return "🎉 JACKPOT! All 5 numbers match!";
      case 4: return "🎊 Amazing! 4 numbers match!";
      case 3: return "🎈 Great! 3 numbers match!";
      case 2: return "👏 Nice! 2 numbers match!";
      default: return "😔 No matches this time. Try again!";
    }
  };

  return (
    <>
      <Confetti show={isOpen && result.isWinner} />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-slate-900 border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-xl">
              Draw Results
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className={`text-lg font-semibold mb-4 ${result.isWinner ? 'text-green-400' : 'text-white'}`}>
                {getMatchMessage(result.matchCount)}
              </div>
              
              {result.isWinner && (
                <div className="text-3xl font-bold text-green-400 mb-4">
                  You won ₵{result.payout}!
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-white text-sm font-medium mb-2">Your Numbers:</h4>
                <div className="flex justify-center gap-2">
                  {result.numbers.map((num) => (
                    <div
                      key={num}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                        result.winningNumbers.includes(num)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white text-sm font-medium mb-2">Winning Numbers:</h4>
                <div className="flex justify-center gap-2">
                  {result.winningNumbers.map((num) => (
                    <div
                      key={num}
                      className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center text-sm font-semibold"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={onClose} className="w-full">
                Continue Playing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JackpotResultModal;
