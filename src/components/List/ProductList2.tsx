import ProductCard from "../card/ProductCard";
import EmptyState from "../../feature/state/EmptyState";


function ProductList2 ({ products, search, category }: { products: { id: number; title: string; description: string; price: number; rating: number; thumbnail: string; discountPercentage: number }[]; search: string; category: string }) {
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
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}


export default ProductList2;