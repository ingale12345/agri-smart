import { useState } from 'react';
import { Onboarding } from '../components/Onboarding';
import { Dashboard } from '../components/Dashboard';
import { Shop } from '../components/Shop';
import { CropManager } from '../components/CropManager';
import { DigitalMandi } from '../components/DigitalMandi';
import { Profile } from '../components/Profile';
import { Navigation } from '../components/Navigation';

export type Screen =
  | 'onboarding'
  | 'dashboard'
  | 'shop'
  | 'crops'
  | 'mandi'
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  if (!user) {
    return <Onboarding onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'shop':
        return <Shop />;
      case 'crops':
        return <CropManager user={user} />;
      case 'mandi':
        return <DigitalMandi user={user} />;
      case 'profile':
        return <Profile user={user} onLogout={() => setUser(null)} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {renderScreen()}
        <Navigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      </div>
    </div>
  );
}
