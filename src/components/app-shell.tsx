import { Header } from './header';
import { BottomNavigation } from './bottom-navigation';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <BottomNavigation />
    </div>
  );
}
