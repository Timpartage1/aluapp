"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Info, Search, MessageSquarePlus, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/context/locale-provider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SearchInput } from './search-input';
import { useState } from 'react';


export function BottomNavigation() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useLocale();

  const navItems = [
    { href: '/home', icon: Home, label: t.nav_home },
    { href: '/home/favorites', icon: Heart, label: t.nav_favorites },
    { href: '/home/resources', icon: BookOpen, label: t.nav_resources },
    { href: '/home/feedback', icon: MessageSquarePlus, label: t.nav_feedback },
    { href: '/home/about', icon: Info, label: t.nav_about },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-background/80 backdrop-blur-sm md:hidden">
      <div className="container mx-auto flex h-16 max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-md p-2 text-sm transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
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
              <Search className="h-5 w-5" />
              <span className="text-[10px] font-medium">{t.nav_search}</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.search_title}</DialogTitle>
            </DialogHeader>
            <SearchInput onSearch={() => setIsSearchOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}
