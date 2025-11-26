
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
                  viewBox="0 0 24 24"
                  className="h-8 w-8 fill-primary"
                >
                  <path d="M19.94,5.43a2,2,0,0,0-1.07-.56l-6.84-2.26a2,2,0,0,0-1.22,0L3.92,4.87a2,2,0,0,0-1.07.56,2,2,0,0,0-.56,1.07L2,13.34a2,2,0,0,0,.56,1.07l6.84,6.84a2,2,0,0,0,1.07.56l6.84,0a2,2,0,0,0,1.07-.56l3.42-3.42a2,2,0,0,0,.56-1.07l1.14-6.84a2,2,0,0,0-.56-1.07Zm-6.31,8.35L11.7,11.85,9.77,13.78,8.81,12.82l1.93-1.93L8.81,9,9.77,8.07l1.93,1.93L13.63,8.07l.95.95L12.66,11l1.93,1.93Z" />
                </svg>
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
