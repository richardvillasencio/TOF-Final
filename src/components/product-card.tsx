import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  name: string;
  category: string;
  imageUrl: string;
  imageHint: string;
  href: string;
  price?: string;
}

export function ProductCard({ name, category, imageUrl, imageHint, href, price }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group">
      <CardHeader className="p-0 border-b">
        <div className="overflow-hidden">
            <Image
            src={imageUrl}
            alt={name}
            width={600}
            height={400}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={imageHint}
            />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <p className="text-sm text-primary font-semibold">{category}</p>
        <CardTitle className="text-xl mt-2 group-hover:text-primary transition-colors">{name}</CardTitle>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full" variant="accent">
          <Link href={href}>{price || 'View Details'}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
