import { Logo } from '@/components/logo';

export function SplashScreen() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background fixed inset-0 z-50">
      <div className="animate-pulse">
        <Logo className="h-16 w-auto text-primary" />
      </div>
      <p className="mt-4 text-center font-headline text-2xl text-primary-foreground">
        K-Square Quotes
      </p>
    </div>
  );
}
