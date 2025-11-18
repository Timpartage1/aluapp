import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-page-bg');

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl font-bold tracking-tight">
              About K-Square Quotes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {aboutImage && (
                <div className="flex-shrink-0">
                  <Image
                    src={aboutImage.imageUrl}
                    alt="KVE-Kris (K-Square)"
                    width={150}
                    height={150}
                    className="rounded-full object-cover shadow-lg border-4 border-card"
                    data-ai-hint={aboutImage.imageHint}
                  />
                </div>
              )}
              <div className="flex-grow space-y-4">
                <p className="text-lg leading-relaxed text-foreground">
                  K-Square Quotes est opérationnelle depuis 2018. Elle est une branche de K-Square Ministries qui consiste à partager sous une forme synthétique (Quote) des inspirations et leçons que Dieu nous apprend lors de moments de méditation et celles que nous découvrons au travers de diverses circonstances de la vie.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  L’objectif de l’application est de mettre des pensées inspirées à la disposition de tous, en ayant la ferme assurance que Dieu continuera à l’utiliser pour étendre son Royaume sur la terre et encourager le plus grand nombre.
                </p>
                <p className="font-semibold text-right text-primary font-headline text-lg">- KVE-Kris (K-Square)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
