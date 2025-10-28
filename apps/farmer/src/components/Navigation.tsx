import { Screen } from '../app/app';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Home, ShoppingCart, Wheat, Store, User } from 'lucide-react';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    {
      id: 'dashboard' as Screen,
      icon: Home,
      label: 'होम',
      labelEn: 'Home',
    },
    {
      id: 'shop' as Screen,
      icon: ShoppingCart,
      label: 'दुकान',
      labelEn: 'Shop',
    },
    {
      id: 'crops' as Screen,
      icon: Wheat,
      label: 'फसल',
      labelEn: 'Crops',
    },
    {
      id: 'mandi' as Screen,
      icon: Store,
      label: 'मंडी',
      labelEn: 'Mandi',
    },
    {
      id: 'profile' as Screen,
      icon: User,
      label: 'प्रोफाइल',
      labelEn: 'Profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? 'text-green-600' : 'text-gray-600'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-green-600 font-medium' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
