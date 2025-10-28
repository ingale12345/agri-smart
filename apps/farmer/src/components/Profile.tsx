import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Input } from '@agri-smart/shared/components/ui/input';
import { Switch } from '@agri-smart/shared/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@agri-smart/shared/components/ui/select';
import {
  User,
  Phone,
  MapPin,
  Wheat,
  Settings,
  Bell,
  Globe,
  LogOut,
  Edit,
  ChevronRight,
} from 'lucide-react';

interface ProfileProps {
  user: any;
  onLogout: () => void;
}

export function Profile({ user, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    weather: true,
    prices: true,
    recommendations: false,
    orders: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-800">
          प्रोफाइल / Profile
        </h1>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="w-4 h-4 mr-1" />
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-green-600" />
            व्यक्तिगत जानकारी / Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">नाम / Name</label>
            {isEditing ? (
              <Input defaultValue={user.name} />
            ) : (
              <p className="py-2 px-3 bg-gray-50 rounded-lg">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              मोबाइल नंबर / Mobile Number
            </label>
            <div className="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{user.phone}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              गांव / Village
            </label>
            {isEditing ? (
              <Input defaultValue={user.village} />
            ) : (
              <div className="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded-lg">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{user.village}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              मुख्य फसलें / Main Crops
            </label>
            {isEditing ? (
              <Input defaultValue={user.crops} />
            ) : (
              <div className="flex items-center gap-2 py-2 px-3 bg-gray-50 rounded-lg">
                <Wheat className="w-4 h-4 text-gray-500" />
                <span>{user.crops}</span>
              </div>
            )}
          </div>

          {isEditing && (
            <Button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            भाषा सेटिंग्स / Language Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium mb-2">
              पसंदीदा भाषा / Preferred Language
            </label>
            <Select defaultValue={user.language}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hindi">हिंदी / Hindi</SelectItem>
                <SelectItem value="marathi">मराठी / Marathi</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-600" />
            सूचना सेटिंग्स / Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weather Updates</p>
              <p className="text-sm text-gray-600">
                Daily weather and rain alerts
              </p>
            </div>
            <Switch
              checked={notifications.weather}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, weather: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Price Alerts</p>
              <p className="text-sm text-gray-600">Market price changes</p>
            </div>
            <Switch
              checked={notifications.prices}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, prices: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Farming Tips</p>
              <p className="text-sm text-gray-600">Crop care recommendations</p>
            </div>
            <Switch
              checked={notifications.recommendations}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, recommendations: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Order Updates</p>
              <p className="text-sm text-gray-600">Order status and delivery</p>
            </div>
            <Switch
              checked={notifications.orders}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, orders: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            ऐप सेटिंग्स / App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span>Help & Support</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-2">
            <span>Privacy Policy</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-2">
            <span>Terms of Service</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between py-2">
            <span>About AgriSmart</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* App Version */}
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-600">AgriSmart v1.0.0</p>
          <p className="text-xs text-gray-500 mt-1">Made for Indian Farmers</p>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="destructive"
        className="w-full flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        लॉग आउट / Logout
      </Button>
    </div>
  );
}
