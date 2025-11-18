
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, History } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const RECENTLY_VIEWED_KEY = 'k-square-recently-viewed';

interface RecentlyViewedData {
  slug: string;
  title: string;
}

export function RecentlyViewedCard() {
  const [recent, setRecent] = useState<RecentlyViewedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (storedData) {
        setRecent(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to load recently viewed from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Skeleton className="h-[98px] w-full rounded-lg" />;
  }

  if (!recent) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <History className="h-8 w-8 text-muted-foreground" />
            <div>
              <CardTitle className="font-headline text-xl">Start exploring</CardTitle>
              <CardDescription>Your last viewed theme will appear here.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Link href={`/home/themes/${recent.slug}`} passHref>
      <Card className="hover:bg-card/90 hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <History className="h-8 w-8 text-primary flex-shrink-0" />
            <div className='overflow-hidden'>
              <CardTitle className="font-headline text-xl truncate">Continue with: {recent.title}</CardTitle>
              <CardDescription>Return to the last theme you viewed.</CardDescription>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </CardHeader>
      </Card>
    </Link>
  );
}
