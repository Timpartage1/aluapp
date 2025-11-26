"use client";

import { useState, useEffect } from 'react';
import { Cog, Home, Heart, Info, MessageSquarePlus, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SettingsSheet } from './settings-sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SearchInput } from './search-input';
import { Logo } from './logo';
import { useLocale } from '@/context/locale-provider';


export function Header() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLocale();

  const navItems = [
    { href: '/home', label: t.nav_home },
    { href: '/home/favorites', label: t.nav_favorites },
    { href: '/home/resources', label: t.nav_resources },
    { href: '/home/feedback', label: t.nav_feedback },
    { href: '/home/about', label: t.nav_about },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 18) {
      setGreeting(t.greeting_morning);
    } else {
      setGreeting(t.greeting_evening);
    }
  }, [t]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
             <Link href="/home" className="mr-4 flex items-center gap-2">
                <Logo className="h-8 w-auto text-primary" />
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block w-64">
              <SearchInput />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(true)}>
              <Cog className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? ''} />
              <AvatarFallback>
                {user?.displayName?.charAt(0).toUpperCase() ?? 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-4 md:px-6 md:hidden">
            <div className="mt-2 text-left">
              <p className="text-sm text-muted-foreground">{greeting} {user?.displayName?.split(' ')[0]}</p>
              <h1 className="font-headline text-xl md:text-2xl font-bold text-primary">
                {t.headline}
              </h1>
            </div>
        </div>
      </header>
      <SettingsSheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}
