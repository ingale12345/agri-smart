import { useState } from 'react';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Input } from '@agri-smart/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@agri-smart/shared/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Smartphone, User, Wheat } from 'lucide-react';

interface OnboardingProps {
  onLogin: (userData: any) => void;
}

export function Onboarding({ onLogin }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'aadhaar'>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    aadhaar: '',
    otp: '',
    name: '',
    village: '',
    crops: '',
    language: 'hindi',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      onLogin({
        name: formData.name,
        village: formData.village,
        crops: formData.crops,
        language: formData.language,
        phone: formData.phone,
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wheat className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">AgriSmart</h1>
        <p className="text-gray-600">आपका कृषि साथी / Your Farming Partner</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">लॉगिन करें / Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant={loginMethod === 'phone' ? 'default' : 'outline'}
              onClick={() => setLoginMethod('phone')}
              className="flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Phone
            </Button>
            <Button
              variant={loginMethod === 'aadhaar' ? 'default' : 'outline'}
              onClick={() => setLoginMethod('aadhaar')}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Aadhaar
            </Button>
          </div>

          {loginMethod === 'phone' ? (
            <div>
              <label className="block text-sm font-medium mb-2">
                मोबाइल नंबर / Mobile Number
              </label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">
                आधार नंबर / Aadhaar Number
              </label>
              <Input
                type="text"
                placeholder="1234 5678 9012"
                value={formData.aadhaar}
                onChange={(e) =>
                  setFormData({ ...formData, aadhaar: e.target.value })
                }
              />
            </div>
          )}

          <Button
            onClick={handleNext}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            OTP भेजें / Send OTP
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            OTP सत्यापन / OTP Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            {loginMethod === 'phone' ? formData.phone : formData.aadhaar} पर
            भेजा गया OTP डालें
          </p>

          <div>
            <label className="block text-sm font-medium mb-2">OTP</label>
            <Input
              type="text"
              placeholder="123456"
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
              className="text-center text-2xl tracking-widest"
              maxLength={6}
            />
          </div>

          <Button
            onClick={handleNext}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            सत्यापित करें / Verify
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            प्रोफाइल सेटअप / Profile Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">नाम / Name</label>
            <Input
              type="text"
              placeholder="राम कुमार / Ram Kumar"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              गांव / Village
            </label>
            <Input
              type="text"
              placeholder="आपका गांव / Your Village"
              value={formData.village}
              onChange={(e) =>
                setFormData({ ...formData, village: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              मुख्य फसलें / Main Crops
            </label>
            <Input
              type="text"
              placeholder="गेहूं, धान, मक्का / Wheat, Rice, Corn"
              value={formData.crops}
              onChange={(e) =>
                setFormData({ ...formData, crops: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              भाषा / Language
            </label>
            <Select
              value={formData.language}
              onValueChange={(value) =>
                setFormData({ ...formData, language: value })
              }
            >
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

          <Button
            onClick={handleNext}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            शुरू करें / Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= step ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
}
