
import { QUOTE_DATA } from '@/lib/quotes';
import { QuoteCard } from '@/components/quote-card';
import { notFound } from 'next/navigation';
import { ThemeViewTracker } from '@/components/theme-view-tracker';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
        <div className="mb-6 text-center md:text-left">
          <h1 className="font-headline text-3xl font-bold tracking-tight">{category.title}</h1>
          <p className="text-muted-foreground mt-1">{category.description}</p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {category.quotes.map((quote, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <QuoteCard quote={quote} categoryImageId={category.image} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </>
  );
}
