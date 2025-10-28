import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Input } from '@agri-smart/shared/components/ui/input';
import { Badge } from '@agri-smart/shared/components/ui/badge';
import { Textarea } from '@agri-smart/shared/components/ui/textarea';
import {
  Plus,
  MapPin,
  Calendar,
  Phone,
  TrendingUp,
  Package,
  Users,
  Banknote,
} from 'lucide-react';

interface DigitalMandiProps {
  user: any;
}

export function DigitalMandi({ user }: DigitalMandiProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-posts' | 'create'>(
    'browse'
  );

  const marketPosts = [
    {
      id: 1,
      farmerName: 'राम कुमार',
      cropType: 'गेहूं / Wheat',
      variety: 'HD-2967',
      quantity: '50 क्विंटल',
      expectedPrice: '2200',
      harvestDate: '2024-04-15',
      location: 'पिंपरी गांव',
      distance: '5.2 km',
      contactNumber: '+91 98765 43210',
      description: 'Premium quality wheat, well dried and cleaned',
      postedDate: '2024-01-20',
      offers: 3,
      status: 'available',
    },
    {
      id: 2,
      farmerName: 'सुनीता देवी',
      cropType: 'टमाटर / Tomato',
      variety: 'Hybrid',
      quantity: '20 क्विंटल',
      expectedPrice: '1800',
      harvestDate: '2024-02-10',
      location: 'शिरूर गांव',
      distance: '3.8 km',
      contactNumber: '+91 98765 43211',
      description: 'Fresh red tomatoes, perfect for market',
      postedDate: '2024-01-18',
      offers: 5,
      status: 'negotiating',
    },
    {
      id: 3,
      farmerName: 'विकास पाटिल',
      cropType: 'प्याज / Onion',
      variety: 'Red',
      quantity: '100 क्विंटल',
      expectedPrice: '1500',
      harvestDate: '2024-03-01',
      location: 'नासिक गांव',
      distance: '8.1 km',
      contactNumber: '+91 98765 43212',
      description: 'Large size red onions, good storage quality',
      postedDate: '2024-01-15',
      offers: 7,
      status: 'sold',
    },
  ];

  const myPosts = [
    {
      id: 4,
      cropType: 'धान / Rice',
      variety: 'IR-64',
      quantity: '40 क्विंटल',
      expectedPrice: '1900',
      harvestDate: '2024-05-10',
      postedDate: '2024-01-22',
      offers: 2,
      status: 'available',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'negotiating':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'उपलब्ध';
      case 'negotiating':
        return 'बातचीत';
      case 'sold':
        return 'बिक गया';
      default:
        return status;
    }
  };

  const renderBrowse = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          बाजार में उपलब्ध / Available in Market
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package className="w-4 h-4" />
          <span>{marketPosts.length} listings</span>
        </div>
      </div>

      {marketPosts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{post.cropType}</h3>
                <p className="text-sm text-gray-600">
                  {post.variety} • {post.quantity}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {post.location} • {post.distance}
                  </span>
                </div>
              </div>
              <Badge className={getStatusColor(post.status)}>
                {getStatusText(post.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>{post.farmerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>
                    Harvest: {new Date(post.harvestDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-green-500" />
                  <span className="font-semibold">
                    ₹{post.expectedPrice}/quintal
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span>{post.offers} offers received</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
              {post.description}
            </p>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Phone className="w-4 h-4 mr-1" />
                Contact
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Make Offer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMyPosts = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">मेरे पोस्ट / My Posts</h2>
        <Button
          size="sm"
          onClick={() => setActiveTab('create')}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          New Post
        </Button>
      </div>

      {myPosts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{post.cropType}</h3>
                <p className="text-sm text-gray-600">
                  {post.variety} • {post.quantity}
                </p>
              </div>
              <Badge className={getStatusColor(post.status)}>
                {getStatusText(post.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>
                    Harvest: {new Date(post.harvestDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>
                    Posted: {new Date(post.postedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-green-500" />
                  <span className="font-semibold">
                    ₹{post.expectedPrice}/quintal
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <span>{post.offers} offers received</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                View Offers
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Edit Post
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCreate = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">नया पोस्ट / Create New Post</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setActiveTab('my-posts')}
        >
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                फसल का नाम / Crop Type
              </label>
              <Input placeholder="e.g. गेहूं, धान" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                किस्म / Variety
              </label>
              <Input placeholder="e.g. HD-2967" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                मात्रा / Quantity
              </label>
              <Input placeholder="e.g. 50 क्विंटल" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                अपेक्षित दाम / Expected Price
              </label>
              <Input placeholder="₹ per quintal" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              कटाई की तारीख / Harvest Date
            </label>
            <Input type="date" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              संपर्क नंबर / Contact Number
            </label>
            <Input placeholder="+91 98765 43210" defaultValue={user.phone} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              विवरण / Description
            </label>
            <Textarea
              placeholder="फसल की गुणवत्ता, भंडारण की स्थिति, आदि के बारे में बताएं..."
              rows={3}
            />
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            Post to Mandi
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-800">
        डिजिटल मंडी / Digital Mandi
      </h1>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'browse' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('browse')}
          className="flex-1"
        >
          Browse
        </Button>
        <Button
          variant={activeTab === 'my-posts' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('my-posts')}
          className="flex-1"
        >
          My Posts
        </Button>
        <Button
          variant={activeTab === 'create' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('create')}
          className="flex-1"
        >
          Create
        </Button>
      </div>

      {/* Market Price Info */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">
            आज के बाजार भाव / Today's Market Rates
          </h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="font-medium">गेहूं</p>
              <p className="text-green-600">₹2,180</p>
            </div>
            <div className="text-center">
              <p className="font-medium">धान</p>
              <p className="text-green-600">₹1,890</p>
            </div>
            <div className="text-center">
              <p className="font-medium">मक्का</p>
              <p className="text-green-600">₹1,650</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'browse' && renderBrowse()}
      {activeTab === 'my-posts' && renderMyPosts()}
      {activeTab === 'create' && renderCreate()}
    </div>
  );
}
