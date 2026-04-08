import { useEffect, useState } from "react";
import ProductCard from "../card/ProductCard";
import SearchBar from "../search/SearchBar";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  discountPercentage: number;
};
const PRODUCTS_SEARCH_API_URL = "https://dummyjson.com/products";

function SearchData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("smartphones");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProducts(): Promise<void> {
        setLoading(true);
        setError("");

        try { 
            let url = "";

            if (search.trim()) {
                url = `${PRODUCTS_SEARCH_API_URL}/search?q=${encodeURIComponent(search)}`;
            } else {
                url = `${PRODUCTS_SEARCH_API_URL}/category/${category}`;
            }

            const response = await fetch(url, { signal });

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

  }, [category, search]);


  return (
    <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Products Explorer {category}</h1>
      <h4>Searching for: {search}</h4>

      {/* Search Input */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Category Buttons */}
      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => setCategory("smartphones")} disabled={search.length > 0}>
          Smartphones
        </button>
        <button onClick={() => setCategory("laptops")} disabled={search.length > 0}>
          Laptops
        </button>
        <button onClick={() => setCategory("fragrances")}>
          Fragrances
        </button>
        <button onClick={() => setCategory("groceries")} disabled={search.length > 0}>
          Groceries
        </button>
      </div>

      {/* UI States */}
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
          {products.map((product) => (
            <ProductCard key = {product.id} product = {product} />
        ))}
      </div>
      )}
    </main>
  );
}

export default SearchData;