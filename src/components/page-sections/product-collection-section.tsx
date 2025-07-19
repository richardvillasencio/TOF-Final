import { ProductCard } from '@/components/product-card';

type Product = {
    name: string;
    category: string;
    imageUrl: string;
    imageHint: string;
    href: string;
    price: string;
}

export type ProductCollectionSectionProps = {
    id: string;
    title: string;
    products: Product[];
};

export function ProductCollectionSection({ id, title, products }: ProductCollectionSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${id}/title`} className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div data-studio-id={`${id}/products`} data-studio-id-mode="reorder" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.name} data-studio-id={`${id}/products/${index}`}>
                <ProductCard {...product} idPrefix={`${id}/products/${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
