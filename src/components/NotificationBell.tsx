
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const NotificationBell = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Jackpot Draw Result',
      message: 'The latest jackpot draw has completed. Check your tickets!',
      time: '2 min ago',
      unread: true
    },
    {
      id: '2',
      title: 'Lucky Draw Winner!',
      message: 'Congratulations! You won ₵50 in the lucky draw.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: '3',
      title: 'Welcome Bonus',
      message: 'Your ₵100 welcome bonus has been credited to your account.',
      time: '1 day ago',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-slate-900 border-white/20" align="end">
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Notifications</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 rounded-lg ${notification.unread ? 'bg-blue-500/20' : 'bg-white/5'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                  <span className="text-white/60 text-xs">{notification.time}</span>
                </div>
                <p className="text-white/80 text-sm">{notification.message}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full border-white/20 text-white">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
