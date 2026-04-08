import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
};

function DataFetch() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    }

    fetchProducts();
  }, []);

  return (
    <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>DummyJSON Products</h1>

      <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
              <p>Category: {product.category}</p>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default DataFetch;