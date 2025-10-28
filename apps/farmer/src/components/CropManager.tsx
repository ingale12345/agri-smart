import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Badge } from '@agri-smart/shared/components/ui/badge';
import { Progress } from '@agri-smart/shared/components/ui/progress';
import {
  Plus,
  Wheat,
  Calendar,
  TrendingUp,
  Droplets,
  Banknote,
  AlertTriangle,
} from 'lucide-react';

interface CropManagerProps {
  user: any;
}

export function CropManager({ user }: CropManagerProps) {
  const [activeTab, setActiveTab] = useState<
    'crops' | 'expenses' | 'recommendations'
  >('crops');

  const crops = [
    {
      id: 1,
      name: 'गेहूं / Wheat',
      variety: 'HD-2967',
      plantedDate: '2024-01-15',
      area: '5 एकड़',
      stage: 'flowering',
      stageProgress: 75,
      expectedHarvest: '2024-04-15',
      totalExpense: 25000,
      expectedYield: '50 क्विंटल',
      expectedRevenue: 75000,
      status: 'healthy',
      lastWatered: '2 days ago',
      nextAction: 'Apply fertilizer in 1 week',
    },
    {
      id: 2,
      name: 'धान / Rice',
      variety: 'IR-64',
      plantedDate: '2024-01-10',
      area: '3 एकड़',
      stage: 'vegetative',
      stageProgress: 45,
      expectedHarvest: '2024-05-10',
      totalExpense: 18000,
      expectedYield: '36 क्विंटल',
      expectedRevenue: 54000,
      status: 'needs_attention',
      lastWatered: '5 days ago',
      nextAction: 'Water immediately',
    },
  ];

  const expenses = [
    {
      id: 1,
      cropName: 'गेहूं',
      category: 'Seeds',
      amount: 5000,
      date: '2024-01-15',
    },
    {
      id: 2,
      cropName: 'गेहूं',
      category: 'Fertilizer',
      amount: 8000,
      date: '2024-02-01',
    },
    {
      id: 3,
      cropName: 'धान',
      category: 'Seeds',
      amount: 3500,
      date: '2024-01-10',
    },
    {
      id: 4,
      cropName: 'धान',
      category: 'Pesticide',
      amount: 2500,
      date: '2024-02-05',
    },
  ];

  const recommendations = [
    {
      id: 1,
      cropName: 'गेहूं',
      type: 'fertilizer',
      title: 'Nitrogen Application Needed',
      description: 'Apply 50kg urea per acre during flowering stage',
      urgency: 'medium',
      estimatedCost: 2500,
    },
    {
      id: 2,
      cropName: 'धान',
      type: 'irrigation',
      title: 'Immediate Watering Required',
      description: 'Rice crop needs water. Check irrigation system',
      urgency: 'high',
      estimatedCost: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'needs_attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // const getStageColor = (progress: number) => {
  //   if (progress < 25) return 'bg-red-500';
  //   if (progress < 50) return 'bg-yellow-500';
  //   if (progress < 75) return 'bg-blue-500';
  //   return 'bg-green-500';
  // };

  const renderCrops = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">मेरी फसलें / My Crops</h2>
        <Button size="sm" className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-1" />
          Add Crop
        </Button>
      </div>

      {crops.map((crop) => (
        <Card key={crop.id}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Wheat className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{crop.name}</h3>
                  <p className="text-sm text-gray-600">
                    {crop.variety} • {crop.area}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(crop.status)}>
                {crop.status === 'healthy' ? 'स्वस्थ' : 'ध्यान दें'}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Growth Stage: {crop.stage}</span>
                <span>{crop.stageProgress}%</span>
              </div>
              <Progress value={crop.stageProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>
                    Planted: {new Date(crop.plantedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Last watered: {crop.lastWatered}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Expected: {crop.expectedYield}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-green-500" />
                  <span>Revenue: ₹{crop.expectedRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Next Action:
                </span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">{crop.nextAction}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderExpenses = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          खर्च ट्रैकिंग / Expense Tracking
        </h2>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-1" />
          Add Expense
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600">₹43,000</p>
              <p className="text-sm text-gray-600">Total Expenses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">₹1,29,000</p>
              <p className="text-sm text-gray-600">Expected Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-medium">Recent Expenses</h3>
        {expenses.map((expense) => (
          <Card key={expense.id}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{expense.category}</p>
                  <p className="text-sm text-gray-600">
                    {expense.cropName} • {expense.date}
                  </p>
                </div>
                <p className="font-semibold text-red-600">
                  ₹{expense.amount.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">सुझाव / Recommendations</h2>

      {recommendations.map((rec) => (
        <Card key={rec.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge
                  variant={rec.urgency === 'high' ? 'destructive' : 'secondary'}
                >
                  {rec.urgency === 'high' ? 'तुरंत' : 'जल्दी'}
                </Badge>
                <span className="text-sm text-gray-600">{rec.cropName}</span>
              </div>
              {rec.estimatedCost > 0 && (
                <span className="text-sm font-medium">
                  ₹{rec.estimatedCost}
                </span>
              )}
            </div>

            <h3 className="font-semibold mb-2">{rec.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{rec.description}</p>

            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Take Action
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-800">
        फसल प्रबंधन / Crop Management
      </h1>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'crops' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('crops')}
          className="flex-1"
        >
          Crops
        </Button>
        <Button
          variant={activeTab === 'expenses' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('expenses')}
          className="flex-1"
        >
          Expenses
        </Button>
        <Button
          variant={activeTab === 'recommendations' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('recommendations')}
          className="flex-1"
        >
          Tips
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'crops' && renderCrops()}
      {activeTab === 'expenses' && renderExpenses()}
      {activeTab === 'recommendations' && renderRecommendations()}
    </div>
  );
}
