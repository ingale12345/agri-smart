import { setNavigate } from '@/utils/navigation';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavigationInitializer() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
}
