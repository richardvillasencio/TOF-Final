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
  const docPath = `pages/hot-tubs/sections/${id}`;
  return (
    <section data-studio-id={docPath} className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${docPath}/title`} className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div data-studio-id={`${docPath}/products`} data-studio-id-mode="reorder" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.name} data-studio-id={`${docPath}/products/${index}`}>
                <ProductCard {...product} idPrefix={`${docPath}/products/${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
