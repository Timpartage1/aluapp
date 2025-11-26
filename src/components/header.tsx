
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="h-8 w-8 fill-primary"
                  >
                  <path d="M43.6,23.8H11.2c-2.3,0-4.2,1.9-4.2,4.2v43.9c0,2.3,1.9,4.2,4.2,4.2h32.4c2.3,0,4.2-1.9,4.2-4.2V28.1C47.8,25.7,46,23.8,43.6,23.8z M35,62.8h-9.2V49h9.2V62.8z M35,44.8h-9.2v-9h9.2V44.8z M32,31.7l-7.2,8.4H18.3l9.5-10.9l-9-10.7h6.6l7.2,8.2V31.7z"/>
                  <path d="M40.3,16.8l-4.2-2.3c-1.6-0.9-3.6-0.9-5.2,0L7.1,24.1c-1.6,0.9-2.7,2.6-2.7,4.5v43.9c0,1.9,1,3.6,2.7,4.5l23.8,13.8c1.6,0.9,3.6,0.9,5.2,0l23.8-13.8c1.6-0.9,2.7-2.6,2.7-4.5V28.5c0-1.9-1-3.6-2.7-4.5L40.3,16.8z M56.8,63.2c0,1.9-1.2,3.6-3,4.3L30,81.3c-1.8,1-4.1,1-5.9,0L0.2,67.5c-1.8-1-3-2.8-3-4.8V28.7c0-2,1.2-3.8,3-4.8l23.8-13.8c1.8-1,4.1-1,5.9,0l23.8,13.8c1.8,1,3,2.8,3,4.8V63.2z"/>
                </svg>
                <div className="hidden sm:flex flex-col">
                    <span className="font-headline text-lg font-bold leading-none">K-SQUARE</span>
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground">MINISTRIES</span>
                </div>
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
