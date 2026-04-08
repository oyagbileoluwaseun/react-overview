import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};
const PRODUCTS_API_URL = "https://dummyjson.com/products";

function DataFetch2() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("smartphones");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProducts(): Promise<void> {
        setLoading(true);
        setError("");

        try { 
            const response = await fetch(`${PRODUCTS_API_URL}/category/${category}`, { signal });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data.products);
        } catch (err: any) {
            if (err.name !== "AbortError") {
            setError((err as Error).message || "An error occurred while fetching products.");
        } 
    } finally {
        setLoading(false);
        }
    }

    fetchProducts();

    return () => {
        controller.abort();
    };

  }, [category]);


  return (
    <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>DummyJSON Products {category}</h1>

      {/* Category Buttons */}
      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => setCategory("smartphones")}>
          Smartphones
        </button>
        <button onClick={() => setCategory("laptops")}>
          Laptops
        </button>
        <button onClick={() => setCategory("fragrances")}>
          Fragrances
        </button>
        <button onClick={() => setCategory("groceries")}>
          Groceries
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
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
            </p>
          </div>
        ))}
      </div>
      )}
    </main>
  );
}

export default DataFetch2;