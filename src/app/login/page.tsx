"use client";

import { useAuth } from '@/context/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("Add this domain to your Firebase authorized domains:", window.location.hostname);
    }
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user, router]);
  
  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 120.8 109.8 11.8 244 11.8c70.3 0 129.8 27.8 174.4 72.4l-66.2 64.2c-26.4-24.3-63.5-39.6-108.2-39.6-86.4 0-156.4 70-156.4 156.4s70 156.4 156.4 156.4c97.9 0 134.5-68.5 140-101.4H244v-85.2h244z"></path>
    </svg>
  );


  if (loading || user) {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center gap-8 rounded-lg bg-card p-8 shadow-2xl md:p-12">
        <Logo className="h-12 w-auto text-primary" />
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold text-card-foreground">
            Welcome to K-Square Quotes
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to start your journey of inspiration.
          </p>
        </div>
        <Button onClick={signInWithGoogle} size="lg" className="w-full max-w-xs">
          <GoogleIcon />
          Sign In with Google
        </Button>
      </div>
    </main>
  );
}
