import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Product = {
  name: string;
  brand: string;
  image: string;
  dataAiHint: string;
  href: string;
  price: string;
};

export type FeaturedProductsSectionProps = {
  title: string;
  products: Product[];
};

export function FeaturedProductsSection({ title, products }: FeaturedProductsSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.name} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="p-0">
                <Image src={product.image} alt={product.name} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={product.dataAiHint}/>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <p className="text-sm text-primary font-semibold">{product.brand}</p>
                <CardTitle className="text-xl mt-2">{product.name}</CardTitle>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full" variant="accent">
                  <Link href={product.href}>{product.price}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
