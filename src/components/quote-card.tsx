
"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { Heart, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/context/favorites-provider';
import type { Quote } from '@/lib/quotes';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { toPng } from 'html-to-image';

interface QuoteCardProps {
  quote: Quote;
  categoryImageId?: string;
  className?: string;
}

export function QuoteCard({ quote, categoryImageId = 'daily-quote-bg', className }: QuoteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();
  const isLiked = isFavorite(quote.id);
  const placeholderImage = PlaceHolderImages.find(img => img.id === categoryImageId) || PlaceHolderImages[0];

  const handleLike = () => {
    if (isLiked) {
      removeFavorite(quote.id);
    } else {
      addFavorite(quote);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate image to share.",
      });
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "k-square-quote.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'K-Square Quote',
            text: `"${quote.text}" - K-Square`,
          });
        } else {
           throw new Error("Sharing not supported");
        }
      } else {
        // Fallback for desktop browsers: download the image
        const link = document.createElement('a');
        link.download = 'k-square-quote.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error sharing quote image', error);
       const link = document.createElement('a');
        link.download = 'k-square-quote.png';
        link.href = await toPng(cardRef.current!, { cacheBust: true, pixelRatio: 2 });
        link.click();
    }
  };

  return (
    <Card ref={cardRef} className={cn("overflow-hidden relative aspect-[4/3] w-full shadow-lg hover:shadow-xl transition-shadow duration-300", className)}>
      <Image
        src={placeholderImage.imageUrl}
        alt={placeholderImage.description}
        fill
        className="object-cover"
        data-ai-hint={placeholderImage.imageHint}
      />
      <div className="absolute inset-0 bg-black/50" />
      <CardContent className="relative z-10 flex h-full flex-col justify-between p-4 md:p-6">
        <div></div>
        <div className="text-center">
          <p className="font-headline text-xl md:text-3xl font-bold text-white shadow-md">
            "{quote.text}"
          </p>
          <p className="mt-4 font-body text-lg text-gray-200">- K-Square</p>
        </div>
        <div className="flex justify-end items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={handleLike}>
            <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
