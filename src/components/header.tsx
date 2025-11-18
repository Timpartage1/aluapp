
"use client";

import { useState, useEffect } from 'react';
import { Cog, Home, Heart, Info } from 'lucide-react';
import { useAuth } from '@/context/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SettingsSheet } from './settings-sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SearchInput } from './search-input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/home/favorites', icon: Heart, label: 'Favorites' },
  { href: '/home/about', icon: Info, label: 'About' },
];

export function Header() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 18) {
      setGreeting('Bonjour,');
    } else {
      setGreeting('Bonsoir,');
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
             <Link href="/home" className="mr-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 50" className="h-6 w-auto fill-primary"><path d="M22.5 45.4L37.8 25 22.5 4.6h10.9L48.8 25l-15.4 20.4H22.5z M0 45.4V4.6h31.2v9.1H10.9v6.5h18.8v9.1H10.9v7.1h20.3v9z" /><rect x="58" y="0" width="50" height="50" rx="5" /></svg>
                <span className="hidden sm:inline font-headline text-xl font-bold">K-Square</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
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
                Passez votre journée avec des moments inspirés
              </h1>
            </div>
        </div>
      </header>
      <SettingsSheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}
