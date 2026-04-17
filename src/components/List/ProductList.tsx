import ProductCard from "../card/ProductCard";


function ProductList ({ products }: { products: { id: number; title: string; description: string; price: number; rating: number; thumbnail: string; discountPercentage: number }[] }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }
  return (
    <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
          {products.map((product) => (
            <ProductCard key = {product.id} product = {product} />
        ))}
      </div>);
}

export default ProductList;