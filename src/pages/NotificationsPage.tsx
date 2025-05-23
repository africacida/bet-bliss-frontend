
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle, Trash2, Settings } from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Jackpot Draw Result',
      message: 'The weekly jackpot draw has completed. Unfortunately, your ticket did not win this time. Better luck next week!',
      time: '2 hours ago',
      unread: true,
      type: 'result'
    },
    {
      id: '2',
      title: 'Lucky Draw Winner! 🎉',
      message: 'Congratulations! You won ₵50 in the lucky draw. The winnings have been credited to your account.',
      time: '5 hours ago',
      unread: true,
      type: 'win'
    },
    {
      id: '3',
      title: 'New Draw Available',
      message: 'A new jackpot draw is now open! Current prize pool: ₵75,000. Buy your tickets before the draw closes.',
      time: '1 day ago',
      unread: false,
      type: 'promo'
    },
    {
      id: '4',
      title: 'Deposit Confirmation',
      message: 'Your deposit of ₵100 has been successfully processed and added to your wallet.',
      time: '2 days ago',
      unread: false,
      type: 'transaction'
    },
    {
      id: '5',
      title: 'Welcome to BetBliss! 🎊',
      message: 'Welcome bonus of ₵100 has been credited to your account. Start playing and good luck!',
      time: '3 days ago',
      unread: false,
      type: 'welcome'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, unread: false })));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'win': return 'text-green-400';
      case 'result': return 'text-blue-400';
      case 'promo': return 'text-purple-400';
      case 'transaction': return 'text-yellow-400';
      case 'welcome': return 'text-pink-400';
      default: return 'text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'win': return '🏆';
      case 'result': return '📊';
      case 'promo': return '🎯';
      case 'transaction': return '💳';
      case 'welcome': return '🎊';
      default: return '📢';
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Notifications</h1>
        <p className="text-white/80 text-lg">Stay updated with your latest activities</p>
      </div>

      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-white" />
          <span className="text-white">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </span>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm" className="border-white/20 text-white">
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark All Read
            </Button>
          )}
          <Button variant="outline" size="sm" className="border-white/20 text-white">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`bg-white/10 backdrop-blur-md border-white/20 ${
              notification.unread ? 'ring-2 ring-blue-500/50' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${getTypeColor(notification.type)}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-sm">{notification.time}</span>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-3">{notification.message}</p>
                  <div className="flex gap-2">
                    {notification.unread && (
                      <Button 
                        onClick={() => markAsRead(notification.id)}
                        variant="outline" 
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10 h-8 px-3"
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button 
                      onClick={() => deleteNotification(notification.id)}
                      variant="outline" 
                      size="sm"
                      className="border-red-500/20 text-red-400 hover:bg-red-500/10 h-8 px-3"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-12 text-center">
              <Bell className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-white/60">You're all caught up! Check back later for updates.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
