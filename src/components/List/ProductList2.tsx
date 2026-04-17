import ProductCard1 from "../../feature/productCard/ProductCard1";
import EmptyState from "../../feature/state/EmptyState";


function ProductList2 ({ products, search, category, onSelectProduct }: { products: { 
    id: number; 
    title: string; 
    description: string; 
    price: number; 
    rating: number; 
    thumbnail: string; 
    discountPercentage: number;
    brand: string;
    category: string;
    stock: number }[]; 
    search: string; 
    category: string;
    onSelectProduct: (product: any) => void }) {
  if (products.length === 0) {
    return <EmptyState search={search} category={category} />;
  }

    return (
        <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
        }}
        >
            {products.map((product) => (
                <ProductCard1 key={product.id} product={product} onSelect={onSelectProduct} />
            ))}
        </div>
    );
}


export default ProductList2;