"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/context/locale-provider';

function ResourcesContent() {
  const { t } = useLocale();

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight">{t.resources_title}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">{t.resources_intro}</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{t.resources_book_title}</CardTitle>
            <CardDescription>{t.resources_book_desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              {/* Replace with actual book cover image */}
              <Image 
                src="https://picsum.photos/seed/book/600/400" 
                alt="Book Cover" 
                width={300} 
                height={200}
                className="rounded-md shadow-lg"
                data-ai-hint="book cover"
              />
            </div>
          </CardContent>
          <CardFooter>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full">
                {t.resources_book_button}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}


export default function ResourcesPage() {
  return <ResourcesContent />;
}
