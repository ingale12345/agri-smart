import { useState, useEffect } from 'react';
import { getTokenFromStorage, getUserFromStorage } from '../../utils/storage';

export const useAuth = () => {
  const [user, setUser] = useState(() => getUserFromStorage());
  const [token, setToken] = useState(() => getTokenFromStorage());

  useEffect(() => {
    setUser(getUserFromStorage());
    setToken(getTokenFromStorage());
  }, []);

  return { user, token, isLoggedIn: !!token };
};
