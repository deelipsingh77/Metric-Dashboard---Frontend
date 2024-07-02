"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/auth/login');
    }
  }, [user, router]);

  if (user === null) {
    return null; // or a loading spinner
  }

  return user ? children : null;
};

export default ProtectedRoute;
