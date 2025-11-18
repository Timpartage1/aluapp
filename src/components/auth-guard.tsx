"use client";

import { useAuth } from '@/context/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SplashScreen } from '@/components/splash-screen';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
