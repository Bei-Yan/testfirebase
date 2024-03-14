// src/context/state.js
import {React, createContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {checkInValidUser} from '@/lib/helper';

export const AppContext = createContext();

export function AppWrapper({children}) {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    // hydrate on mount
    if (checkInValidUser()) {
      alert('Token expired, redirect to Home page.');
      router.push('/');
      return;
    }

    const user = localStorage.getItem('USER');
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <AppContext.Provider value={{user, setUser}} >
      {children}
    </AppContext.Provider>
  );
}
