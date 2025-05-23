
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    defaultTicketPrice: '5',
    luckyDrawCost: '2',
    drawInterval: '60',
    prizeMultiplier: '0.8',
    platformMessage: 'Welcome to BetBliss - Your premier betting platform!',
    termsOfService: 'By using this platform, you agree to our terms and conditions...',
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Platform settings have been updated successfully.",
    });
  };

  const handleUpdateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Settings</h2>
        <p className="text-gray-600">Configure platform parameters and content</p>
      </div>

      {/* Game Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Game Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Jackpot Ticket Price (₵)
              </label>
              <Input
                type="number"
                value={settings.defaultTicketPrice}
                onChange={(e) => handleUpdateSetting('defaultTicketPrice', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lucky Draw Entry Cost (₵)
              </label>
              <Input
                type="number"
                value={settings.luckyDrawCost}
                onChange={(e) => handleUpdateSetting('luckyDrawCost', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lucky Draw Interval (seconds)
              </label>
              <Input
                type="number"
                value={settings.drawInterval}
                onChange={(e) => handleUpdateSetting('drawInterval', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prize Pool Multiplier
              </label>
              <Input
                type="number"
                step="0.1"
                value={settings.prizeMultiplier}
                onChange={(e) => handleUpdateSetting('prizeMultiplier', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Percentage of ticket sales allocated to prize pool
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Content */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Welcome Message
            </label>
            <Input
              value={settings.platformMessage}
              onChange={(e) => handleUpdateSetting('platformMessage', e.target.value)}
              placeholder="Enter welcome message"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Terms of Service
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md h-32"
              value={settings.termsOfService}
              onChange={(e) => handleUpdateSetting('termsOfService', e.target.value)}
              placeholder="Enter terms of service"
            />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Email Notifications</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Win notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Deposit confirmations</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Marketing emails</span>
                </label>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Security Settings</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Two-factor authentication</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Login attempt limits</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">IP whitelist</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} size="lg">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsManager;
