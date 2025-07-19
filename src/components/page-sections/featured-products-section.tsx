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
  id: string;
  title: string;
  products: Product[];
};

export function FeaturedProductsSection({ id, title, products }: FeaturedProductsSectionProps) {
  const docPath = `pages/home/sections/${id}`;
  return (
    <section data-studio-id={docPath} className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${docPath}/title`} className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div data-studio-id={`${docPath}/products`} data-studio-id-mode="reorder" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card key={product.name} data-studio-id={`${docPath}/products/${index}`} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="p-0">
                <Image src={product.image} alt={product.name} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={product.dataAiHint} data-studio-id={`${docPath}/products/${index}/image`} />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <p data-studio-id={`${docPath}/products/${index}/brand`} className="text-sm text-primary font-semibold">{product.brand}</p>
                <CardTitle data-studio-id={`${docPath}/products/${index}/name`} className="text-xl mt-2">{product.name}</CardTitle>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full" variant="accent">
                  <Link href={product.href} data-studio-id={`${docPath}/products/${index}/price`}>{product.price}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
