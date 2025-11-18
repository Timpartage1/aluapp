
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { QuoteCard } from '@/components/quote-card';
import { QUOTE_DATA, ALL_QUOTES } from '@/lib/quotes';
import type { Quote } from '@/lib/quotes';
import { Skeleton } from '@/components/ui/skeleton';
import { RecentlyViewedCard } from '@/components/recently-viewed-card';

export default function HomePage() {
  const [dailyQuote, setDailyQuote] = useState<(Quote & { categorySlug: string }) | null>(null);

  useEffect(() => {
    const getDailyQuote = () => {
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const quoteIndex = dayOfYear % ALL_QUOTES.length;
      return ALL_QUOTES[quoteIndex];
    };
    setDailyQuote(getDailyQuote());
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 space-y-8">
      
      {/* Daily Quote Section */}
      <section>
        <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">Quote of the Day</h2>
        {dailyQuote ? (
          <QuoteCard quote={dailyQuote} categoryImageId={QUOTE_DATA.find(c => c.slug === dailyQuote.categorySlug)?.image} />
        ) : (
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
        )}
      </section>

      {/* Themes Section */}
      <section>
        <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">Themes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUOTE_DATA.map((category) => (
            <Link key={category.slug} href={`/home/themes/${category.slug}`} passHref>
              <Card className="h-full hover:bg-card/90 hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Viewed Section */}
      <section>
        <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">Recently Viewed</h2>
        <RecentlyViewedCard />
      </section>
    </div>
  );
}
