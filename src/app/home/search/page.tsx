"use client";

import { useSearchParams } from 'next/navigation';
import { QuoteCard } from '@/components/quote-card';
import { ALL_QUOTES, QUOTE_DATA } from '@/lib/quotes';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const searchResults = query
    ? ALL_QUOTES.filter((quote) =>
        quote.text.toLowerCase().includes(query.toLowerCase())
      )
    : [];

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
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-6">
        Search Results {query && `for "${query}"`}
      </h1>
      {searchResults.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            {query ? "No quotes found." : "Please enter a search term."}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {query ? "Try searching for something else." : "Use the search bar in the header to find quotes."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((quote) => {
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
