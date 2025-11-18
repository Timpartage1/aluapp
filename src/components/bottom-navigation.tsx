"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Info, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-provider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SearchInput } from './search-input';
import { useState } from 'react';


const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/home/favorites', icon: Heart, label: 'Favorites' },
  { href: '/home/about', icon: Info, label: 'About' },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-background/80 backdrop-blur-sm md:hidden">
      <div className="container mx-auto flex h-16 max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-md p-2 text-sm transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
         <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <button
              className={cn(
                'flex flex-col items-center gap-1 rounded-md p-2 text-sm transition-colors text-muted-foreground hover:text-foreground'
              )}
            >
              <Search className="h-6 w-6" />
              <span className="text-xs font-medium">Search</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search Quotes</DialogTitle>
            </DialogHeader>
            <SearchInput onSearch={() => setIsSearchOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}
