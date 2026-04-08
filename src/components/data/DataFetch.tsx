import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
};
const PRODUCTS_API_URL = "https://dummyjson.com/products";

function DataFetch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
        try { 
            const response = await fetch(PRODUCTS_API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data.products);
        } catch (err: unknown) {
            if (err instanceof Error) {
            setError((err as Error).message);
        } else {
            setError("Something went wrong while fetching products.");
        } 
    } finally {
        setLoading(false);
        }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
        <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
        <h1>DummyJSON Products</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
        <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
        <h1>DummyJSON Products</h1>
        <p style={{ color: "red" }}>{error}</p>
      </main>
    );
  }


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