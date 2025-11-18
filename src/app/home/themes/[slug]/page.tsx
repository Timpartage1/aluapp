
import { QUOTE_DATA } from '@/lib/quotes';
import { QuoteCard } from '@/components/quote-card';
import { notFound } from 'next/navigation';
import { ThemeViewTracker } from '@/components/theme-view-tracker';

export async function generateStaticParams() {
  return QUOTE_DATA.map((category) => ({
    slug: category.slug,
  }));
}

export default function ThemePage({ params }: { params: { slug: string } }) {
  const category = QUOTE_DATA.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <ThemeViewTracker slug={category.slug} title={category.title} />
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6">
          <h1 className="font-headline text-3xl font-bold tracking-tight">{category.title}</h1>
          <p className="text-muted-foreground mt-1">{category.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} categoryImageId={category.image} />
          ))}
        </div>
      </div>
    </>
  );
}
