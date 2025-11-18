"use client";

import { useFavorites } from '@/context/favorites-provider';
import { QuoteCard } from '@/components/quote-card';
import { QUOTE_DATA } from '@/lib/quotes';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const getCategoryForQuote = (quoteId: string) => {
    for (const category of QUOTE_DATA) {
      if (category.quotes.some(q => q.id === quoteId)) {
        return category;
      }
    }
    return undefined;
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-6">Your Favorite Quotes</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">You haven't liked any quotes yet.</p>
          <p className="text-sm text-muted-foreground mt-2">Tap the heart icon on a quote to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((quote) => {
            const category = getCategoryForQuote(quote.id);
            return (
              <QuoteCard 
                key={quote.id} 
                quote={quote} 
                categoryImageId={category?.image}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
