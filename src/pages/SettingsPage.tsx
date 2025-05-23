
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LogOut, Moon, Sun, Bell, Shield, Wallet } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    darkMode: true,
    drawNotifications: true,
    winNotifications: true,
    promoNotifications: false,
    emailUpdates: true,
    smsUpdates: false,
    twoFactorAuth: false,
    autoPlay: false
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleExportData = () => {
    alert('Data export functionality would be implemented here');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion would be processed here');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
        <p className="text-white/80 text-lg">Customize your BetBliss experience</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Appearance Settings */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              {settings.darkMode ? <Moon className="mr-2 h-5 w-5" /> : <Sun className="mr-2 h-5 w-5" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="text-white">Dark Mode</Label>
              <Switch
                id="darkMode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="drawNotifications" className="text-white">Draw Results</Label>
              <Switch
                id="drawNotifications"
                checked={settings.drawNotifications}
                onCheckedChange={(checked) => handleSettingChange('drawNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="winNotifications" className="text-white">Win Notifications</Label>
              <Switch
                id="winNotifications"
                checked={settings.winNotifications}
                onCheckedChange={(checked) => handleSettingChange('winNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="promoNotifications" className="text-white">Promotions</Label>
              <Switch
                id="promoNotifications"
                checked={settings.promoNotifications}
                onCheckedChange={(checked) => handleSettingChange('promoNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="emailUpdates" className="text-white">Email Updates</Label>
              <Switch
                id="emailUpdates"
                checked={settings.emailUpdates}
                onCheckedChange={(checked) => handleSettingChange('emailUpdates', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="smsUpdates" className="text-white">SMS Updates</Label>
              <Switch
                id="smsUpdates"
                checked={settings.smsUpdates}
                onCheckedChange={(checked) => handleSettingChange('smsUpdates', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactorAuth" className="text-white">Two-Factor Authentication</Label>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>

            <Button variant="outline" className="w-full border-white/20 text-white">
              Change Password
            </Button>

            <Button variant="outline" className="w-full border-white/20 text-white">
              Manage Trusted Devices
            </Button>
          </CardContent>
        </Card>

        {/* Game Settings */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Game Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoPlay" className="text-white">Auto-play Lucky Draw</Label>
              <Switch
                id="autoPlay"
                checked={settings.autoPlay}
                onCheckedChange={(checked) => handleSettingChange('autoPlay', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Default Bet Amounts</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="border-white/20 text-white">₵2</Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white">₵5</Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white">₵10</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Actions */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-8">
        <CardHeader>
          <CardTitle className="text-white">Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button onClick={handleExportData} variant="outline" className="border-white/20 text-white">
              Export My Data
            </Button>
            
            <Button onClick={handleLogout} variant="outline" className="border-orange-500/20 text-orange-400 hover:bg-orange-500/10">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            
            <Button onClick={handleDeleteAccount} variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
