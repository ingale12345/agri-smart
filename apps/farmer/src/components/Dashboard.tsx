import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Badge } from '@agri-smart/shared/components/ui/badge';
import {
  Wheat,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Banknote,
  MapPin,
  Sun,
  Droplets,
  ThermometerSun,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  user: any;
}

export function Dashboard({ user }: DashboardProps) {
  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 'Light rain expected',
  };

  const quickStats = {
    totalExpenses: '₹45,000',
    expectedRevenue: '₹1,25,000',
    activeCrops: 3,
    pendingOrders: 2,
  };

  const recentActivities = [
    {
      id: 1,
      text: 'Fertilizer order delivered',
      time: '2 hours ago',
      type: 'order',
    },
    { id: 2, text: 'Wheat crop updated', time: '1 day ago', type: 'crop' },
    { id: 3, text: 'New buyer inquiry', time: '2 days ago', type: 'mandi' },
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Wheat Fertilizer Needed',
      description: 'Your wheat crop needs nitrogen fertilizer in 2 weeks',
      urgency: 'medium',
    },
    {
      id: 2,
      title: 'Market Price Alert',
      description: 'Tomato prices increased by 15% this week',
      urgency: 'high',
    },
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-green-800">
            नमस्ते {user.name}
          </h1>
          <p className="text-gray-600 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {user.village}
          </p>
        </div>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Wheat className="w-6 h-6 text-green-600" />
        </div>
      </div>

      {/* Weather Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">आज का मौसम</h3>
              <p className="text-sm text-gray-600">{weatherData.rainfall}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <ThermometerSun className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-sm font-semibold">
                  {weatherData.temperature}°C
                </p>
              </div>
              <div className="text-center">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-sm font-semibold">{weatherData.humidity}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Banknote className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">कुल खर्च</p>
            <p className="text-lg font-bold text-red-600">
              {quickStats.totalExpenses}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">अपेक्षित आय</p>
            <p className="text-lg font-bold text-green-600">
              {quickStats.expectedRevenue}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Wheat className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">सक्रिय फसलें</p>
            <p className="text-lg font-bold">{quickStats.activeCrops}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingCart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">लंबित ऑर्डर</p>
            <p className="text-lg font-bold">{quickStats.pendingOrders}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            सुझाव / Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{rec.title}</h4>
                  <Badge
                    variant={
                      rec.urgency === 'high' ? 'destructive' : 'secondary'
                    }
                  >
                    {rec.urgency === 'high' ? 'तुरंत' : 'जल्दी'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            हाल की गतिविधि / Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.text}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 bg-green-600 hover:bg-green-700 flex flex-col gap-1">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-sm">खरीदारी</span>
        </Button>
        <Button className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col gap-1">
          <Wheat className="w-6 h-6" />
          <span className="text-sm">फसल ट्रैक</span>
        </Button>
      </div>
    </div>
  );
}
